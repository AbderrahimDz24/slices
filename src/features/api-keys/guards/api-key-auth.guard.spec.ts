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
    const validateSubmittedKey = jest.fn();
    const apiKey = {
      id: 'apk_f63886a3ffc04f6b',
      user: {
        id: 'usr_f63886a3ffc04f6b',
        email: 'client@example.com',
        role: UserRoles.REGULAR,
      },
    } as ApiKey;
    validateSubmittedKey.mockResolvedValue(apiKey);
    const service = {
      validateSubmittedKey,
    } as unknown as ApiKeysService;
    const guard = new ApiKeyAuthGuard(service);
    const { context, request } = contextFor({
      authorization: 'ApiKey ak_test_payload',
    });

    await expect(guard.canActivate(context)).resolves.toBe(true);

    expect(validateSubmittedKey).toHaveBeenCalledWith('ak_test_payload');
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
    const validateSubmittedKey = jest.fn();
    const service = {
      validateSubmittedKey,
    } as unknown as ApiKeysService;
    const guard = new ApiKeyAuthGuard(service);
    const { context } = contextFor();

    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    expect(validateSubmittedKey).not.toHaveBeenCalled();
  });

  it('rejects invalid API keys', async () => {
    const validateSubmittedKey = jest.fn().mockResolvedValue(null);
    const service = {
      validateSubmittedKey,
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
