import { NotFoundException } from '@nestjs/common';
import { UserRoles } from '@common/enums';
import { ApiKey, ApiKeyMode } from '@api-keys/models';
import { ApiKeyRepository, CreateApiKeyRecord } from '@api-keys/repositories';
import { ApiKeysService } from './api-keys.service';

describe('ApiKeysService', () => {
  function setup(mode: ApiKeyMode = ApiKeyMode.Test) {
    const records = new Map<string, ApiKey>();
    const createApiKey = jest.fn(
      (input: CreateApiKeyRecord): Promise<ApiKey> => {
        const apiKey = {
          ...input,
          user: {
            id: input.userId,
            email: 'client@example.com',
            role: UserRoles.REGULAR,
          },
          lastUsedAt: null,
          revokedAt: null,
          createdAt: new Date('2025-07-15T10:20:00.000Z'),
          updatedAt: new Date('2025-07-15T10:20:00.000Z'),
        } as ApiKey;
        records.set(apiKey.id, apiKey);
        return Promise.resolve(apiKey);
      },
    );
    const findActiveById = jest.fn(
      (id: string): Promise<ApiKey | null> =>
        Promise.resolve(records.get(id) ?? null),
    );
    const markLastUsed = jest.fn((id: string, lastUsedAt: Date) => {
      const apiKey = records.get(id);
      if (apiKey) {
        apiKey.lastUsedAt = lastUsedAt;
      }
      return Promise.resolve();
    });
    const revokeForUser = jest.fn((id: string, userId: string) => {
      const apiKey = records.get(id);
      if (!apiKey || apiKey.userId !== userId || apiKey.revokedAt) {
        return Promise.resolve(false);
      }
      apiKey.revokedAt = new Date('2025-07-16T10:20:00.000Z');
      return Promise.resolve(true);
    });
    const repository = {
      createApiKey,
      findActiveById,
      findActiveByUserId: jest.fn(
        (userId: string): Promise<ApiKey[]> =>
          Promise.resolve(
            [...records.values()].filter(
              (apiKey) => apiKey.userId === userId && !apiKey.revokedAt,
            ),
          ),
      ),
      markLastUsed,
      revokeForUser,
    } as unknown as ApiKeyRepository;

    return {
      createApiKey,
      findActiveById,
      markLastUsed,
      records,
      repository,
      revokeForUser,
      service: new ApiKeysService(repository, { mode }),
    };
  }

  function replaceSecret(rawKey: string, service: ApiKeysService): string {
    const parsed = service.parseRawKey(rawKey);
    if (!parsed) {
      throw new Error('Expected generated API key to parse');
    }
    const replacementSecret = parsed.secret.endsWith('A')
      ? `${parsed.secret.slice(0, -1)}B`
      : `${parsed.secret.slice(0, -1)}A`;
    const payload = Buffer.from(
      `${parsed.keyId}.${replacementSecret}`,
      'utf8',
    ).toString('base64url');
    return `ak_${parsed.mode}_${payload}`;
  }

  function decodePreviewPayload(keyPreview: string): string {
    return Buffer.from(
      keyPreview.slice('ak_test_'.length),
      'base64url',
    ).toString('utf8');
  }

  it('creates a show-once raw key and stores only the secret hash', async () => {
    const { createApiKey, service } = setup();

    const created = await service.createApiKey(
      'usr_f63886a3ffc04f6b',
      'Mobile app integration',
    );
    const parsed = service.parseRawKey(created.rawKey);

    expect(created.rawKey).toMatch(/^ak_test_[A-Za-z0-9_-]+$/);
    expect(parsed).toMatchObject({
      mode: ApiKeyMode.Test,
      keyId: created.apiKey.id,
    });
    expect(created.apiKey.keyPreview).toBe(
      `ak_test_${Buffer.from(`${created.apiKey.id}.`, 'utf8').toString('base64url')}`,
    );
    expect(created.rawKey.startsWith(created.apiKey.keyPreview)).toBe(true);
    expect(decodePreviewPayload(created.apiKey.keyPreview)).toBe(
      `${created.apiKey.id}.`,
    );
    expect(createApiKey).toHaveBeenCalledWith(
      expect.objectContaining({
        id: created.apiKey.id,
        userId: 'usr_f63886a3ffc04f6b',
        name: 'Mobile app integration',
        keyPreview: created.apiKey.keyPreview,
        secretHash: expect.any(String) as string,
        mode: ApiKeyMode.Test,
      }),
    );
    const createInput = createApiKey.mock.calls[0]?.[0];
    expect(createInput?.secretHash).toMatch(/^[a-f0-9]{64}$/);
    expect(created.rawKey).not.toContain(created.apiKey.secretHash);
  });

  it('validates an active REGULAR user key and updates lastUsedAt', async () => {
    const { markLastUsed, service } = setup();
    const created = await service.createApiKey(
      'usr_f63886a3ffc04f6b',
      'Mobile app integration',
    );

    const validated = await service.validateSubmittedKey(created.rawKey);

    expect(validated?.id).toBe(created.apiKey.id);
    expect(markLastUsed).toHaveBeenCalledWith(
      created.apiKey.id,
      expect.any(Date),
    );
    expect(validated?.lastUsedAt).toBeInstanceOf(Date);
  });

  it('rejects a key from a different API_KEY_MODE before repository lookup', async () => {
    const testSetup = setup(ApiKeyMode.Test);
    const created = await testSetup.service.createApiKey(
      'usr_f63886a3ffc04f6b',
      'Mobile app integration',
    );
    const liveSetup = setup(ApiKeyMode.Live);

    const validated = await liveSetup.service.validateSubmittedKey(
      created.rawKey,
    );

    expect(validated).toBeNull();
    expect(liveSetup.findActiveById).not.toHaveBeenCalled();
  });

  it('rejects a submitted key with the wrong secret', async () => {
    const { markLastUsed, service } = setup();
    const created = await service.createApiKey(
      'usr_f63886a3ffc04f6b',
      'Mobile app integration',
    );

    const validated = await service.validateSubmittedKey(
      replaceSecret(created.rawKey, service),
    );

    expect(validated).toBeNull();
    expect(markLastUsed).not.toHaveBeenCalled();
  });

  it('rejects keys owned by ADMIN users', async () => {
    const { records, service } = setup();
    const created = await service.createApiKey(
      'usr_f63886a3ffc04f6b',
      'Mobile app integration',
    );
    records.get(created.apiKey.id)!.user.role = UserRoles.ADMIN;

    await expect(
      service.validateSubmittedKey(created.rawKey),
    ).resolves.toBeNull();
  });

  it('returns null for malformed raw keys', () => {
    const { service } = setup();

    expect(service.parseRawKey('not-a-key')).toBeNull();
    expect(service.parseRawKey('ak_test_not base64url')).toBeNull();
    expect(service.parseRawKey('ak_demo_abc')).toBeNull();
  });

  it('lists only active keys from the repository', async () => {
    const { service } = setup();
    const first = await service.createApiKey('usr_owner', 'First');
    const second = await service.createApiKey('usr_owner', 'Second');
    await service.revokeApiKey('usr_owner', first.apiKey.id);

    await expect(service.listActiveApiKeys('usr_owner')).resolves.toEqual([
      second.apiKey,
    ]);
  });

  it('throws NotFoundException when revoking a missing active key', async () => {
    const { service } = setup();

    await expect(
      service.revokeApiKey('usr_owner', 'apk_missing00000000'),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
