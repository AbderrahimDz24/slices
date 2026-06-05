import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { UserRoles } from '@common/enums';
import { AuthType } from '@auth/enums';
import { ApiKey } from '@api-keys/models';
import { ApiKeysService } from '@api-keys/services';
import { ApiKeyAuthGuard } from './api-key-auth.guard';

describe('ApiKeyAuthGuard', () => {
  function contextFor(headers: Record<string, string> = {}) {
    const request = { headers };
    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as unknown as ExecutionContext;

    return { context, request };
  }

  it('attaches ActiveUserData for a valid API key', async () => {
    const apiKey = {
      id: 'apk_f63886a3ffc04f6b',
      user: {
        id: 'usr_f63886a3ffc04f6b',
        email: 'client@example.com',
        role: UserRoles.REGULAR,
      },
    } as ApiKey;
    const service = {
      validateSubmittedKey: jest.fn().mockResolvedValue(apiKey),
    } as unknown as ApiKeysService;
    const guard = new ApiKeyAuthGuard(service);
    const { context, request } = contextFor({
      authorization: 'ApiKey ak_test_payload',
    });

    await expect(guard.canActivate(context)).resolves.toBe(true);

    expect(service.validateSubmittedKey).toHaveBeenCalledWith(
      'ak_test_payload',
    );
    expect(request).toMatchObject({
      user: {
        sub: 'usr_f63886a3ffc04f6b',
        email: 'client@example.com',
        role: UserRoles.REGULAR,
        authType: AuthType.ApiKey,
        apiKeyId: 'apk_f63886a3ffc04f6b',
      },
    });
  });

  it('rejects missing API key headers', async () => {
    const service = {
      validateSubmittedKey: jest.fn(),
    } as unknown as ApiKeysService;
    const guard = new ApiKeyAuthGuard(service);
    const { context } = contextFor();

    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    expect(service.validateSubmittedKey).not.toHaveBeenCalled();
  });

  it('rejects invalid API keys', async () => {
    const service = {
      validateSubmittedKey: jest.fn().mockResolvedValue(null),
    } as unknown as ApiKeysService;
    const guard = new ApiKeyAuthGuard(service);
    const { context } = contextFor({
      authorization: 'ApiKey ak_test_payload',
    });

    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });
});
