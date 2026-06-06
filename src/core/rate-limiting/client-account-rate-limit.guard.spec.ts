import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  ThrottlerException,
  type ThrottlerModuleOptions,
  type ThrottlerStorage,
} from '@nestjs/throttler';
import { UserRoles } from '@common/enums';
import { AuthType } from '@auth/enums';
import { CLIENT_ACCOUNT_RATE_LIMIT_KEY } from './client-account-rate-limit.constants';
import { ClientAccountRateLimitGuard } from './client-account-rate-limit.guard';

describe('ClientAccountRateLimitGuard', () => {
  const options: ThrottlerModuleOptions = {
    throttlers: [
      {
        name: 'clientAccount',
        limit: 2,
        ttl: 60000,
        blockDuration: 60000,
      },
    ],
  };

  class TestController {
    handler() {}

    secondHandler() {}

    unmeteredHandler() {}
  }

  Reflect.defineMetadata(
    CLIENT_ACCOUNT_RATE_LIMIT_KEY,
    true,
    TestController.prototype.handler,
  );
  Reflect.defineMetadata(
    CLIENT_ACCOUNT_RATE_LIMIT_KEY,
    true,
    TestController.prototype.secondHandler,
  );

  function contextFor(
    user?: {
      sub: string;
      authType: AuthType;
      role?: UserRoles;
    },
    handler: () => void = TestController.prototype.handler,
  ): ExecutionContext {
    const request = {
      user: user ? { role: UserRoles.REGULAR, ...user } : undefined,
    };
    const response = { header: jest.fn() };

    return {
      getClass: () => TestController,
      getHandler: () => handler,
      switchToHttp: () => ({
        getRequest: () => request,
        getResponse: () => response,
      }),
    } as unknown as ExecutionContext;
  }

  async function setup(
    increment: ThrottlerStorage['increment'] = jest.fn().mockResolvedValue({
      totalHits: 1,
      timeToExpire: 60,
      isBlocked: false,
      timeToBlockExpire: 0,
    }),
  ): Promise<{
    guard: ClientAccountRateLimitGuard;
    increment: jest.MockedFunction<ThrottlerStorage['increment']>;
  }> {
    const storage = {
      increment,
    } as ThrottlerStorage;
    const guard = new ClientAccountRateLimitGuard(
      options,
      storage,
      new Reflector(),
    );
    await guard.onModuleInit();

    return {
      guard,
      increment: increment as jest.MockedFunction<
        ThrottlerStorage['increment']
      >,
    };
  }

  it('uses the same Client Account key for Bearer and ApiKey credentials', async () => {
    const { guard, increment } = await setup();

    await guard.canActivate(
      contextFor({ sub: 'usr_client00000001', authType: AuthType.Bearer }),
    );
    await guard.canActivate(
      contextFor({ sub: 'usr_client00000001', authType: AuthType.ApiKey }),
    );

    expect(increment).toHaveBeenCalledTimes(2);
    expect(increment.mock.calls[0]?.[0]).toBe(increment.mock.calls[1]?.[0]);
    expect(increment.mock.calls[0]?.slice(1)).toEqual([
      60000,
      2,
      60000,
      'clientAccount',
    ]);
  });

  it('uses the same Client Account key across integration routes', async () => {
    const { guard, increment } = await setup();

    await guard.canActivate(
      contextFor({ sub: 'usr_client00000001', authType: AuthType.Bearer }),
    );
    await guard.canActivate(
      contextFor(
        { sub: 'usr_client00000001', authType: AuthType.Bearer },
        TestController.prototype.secondHandler,
      ),
    );

    expect(increment.mock.calls[0]?.[0]).toBe(increment.mock.calls[1]?.[0]);
  });

  it('uses different keys for different Client Accounts', async () => {
    const { guard, increment } = await setup();

    await guard.canActivate(
      contextFor({ sub: 'usr_client00000001', authType: AuthType.Bearer }),
    );
    await guard.canActivate(
      contextFor({ sub: 'usr_client00000002', authType: AuthType.Bearer }),
    );

    expect(increment.mock.calls[0]?.[0]).not.toBe(increment.mock.calls[1]?.[0]);
  });

  it('skips requests without an authenticated Client Account', async () => {
    const { guard, increment } = await setup();

    await expect(guard.canActivate(contextFor())).resolves.toBe(true);

    expect(increment).not.toHaveBeenCalled();
  });

  it('skips routes without Client Account rate-limit metadata', async () => {
    const { guard, increment } = await setup();
    class UnmeteredController {
      handler() {}
    }

    await expect(
      guard.canActivate({
        getClass: () => UnmeteredController,
        getHandler: () => UnmeteredController.prototype.handler,
        switchToHttp: () => ({
          getRequest: () => ({
            user: {
              sub: 'usr_client00000001',
              authType: AuthType.Bearer,
              role: UserRoles.REGULAR,
            },
          }),
          getResponse: () => ({ header: jest.fn() }),
        }),
      } as unknown as ExecutionContext),
    ).resolves.toBe(true);

    expect(increment).not.toHaveBeenCalled();
  });

  it('throws when the Client Account exceeds the budget', async () => {
    const { guard } = await setup(
      jest.fn().mockResolvedValue({
        totalHits: 3,
        timeToExpire: 60,
        isBlocked: true,
        timeToBlockExpire: 60,
      }),
    );

    await expect(
      guard.canActivate(
        contextFor({ sub: 'usr_client00000001', authType: AuthType.Bearer }),
      ),
    ).rejects.toBeInstanceOf(ThrottlerException);
  });

  it('fails open when Redis storage is unavailable', async () => {
    const { guard } = await setup(
      jest.fn().mockRejectedValue(new Error('ECONNREFUSED')),
    );

    await expect(
      guard.canActivate(
        contextFor({ sub: 'usr_client00000001', authType: AuthType.Bearer }),
      ),
    ).resolves.toBe(true);
  });
});
