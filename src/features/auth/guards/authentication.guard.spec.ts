import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthType } from '@auth/enums';
import { ClientAccountRateLimitGuard } from '@core/rate-limiting';
import { AuthenticationGuard } from './authentication.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiKeyAuthGuard } from '@api-keys/guards';

describe('AuthenticationGuard', () => {
  const context = {
    getHandler: jest.fn(),
    getClass: jest.fn(),
  } as unknown as ExecutionContext;

  function setup(authTypes?: AuthType[]) {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(authTypes),
    } as unknown as Reflector;
    const jwtCanActivate = jest.fn().mockResolvedValue(true);
    const jwtAuthGuard = {
      canActivate: jwtCanActivate,
    } as unknown as JwtAuthGuard;
    const apiKeyCanActivate = jest.fn().mockResolvedValue(true);
    const apiKeyAuthGuard = {
      canActivate: apiKeyCanActivate,
    } as unknown as ApiKeyAuthGuard;
    const rateLimitCanActivate = jest.fn().mockResolvedValue(true);
    const clientAccountRateLimitGuard = {
      canActivate: rateLimitCanActivate,
    } as unknown as ClientAccountRateLimitGuard;
    const guard = new AuthenticationGuard(
      reflector,
      jwtAuthGuard,
      apiKeyAuthGuard,
      clientAccountRateLimitGuard,
    );

    return {
      apiKeyCanActivate,
      apiKeyAuthGuard: apiKeyAuthGuard as CanActivate,
      guard,
      jwtCanActivate,
      jwtAuthGuard: jwtAuthGuard as CanActivate,
      rateLimitCanActivate,
      reflector,
    };
  }

  it('defaults to Bearer authentication', async () => {
    const { apiKeyCanActivate, guard, jwtCanActivate, rateLimitCanActivate } =
      setup();

    await expect(guard.canActivate(context)).resolves.toBe(true);

    expect(jwtCanActivate).toHaveBeenCalledWith(context);
    expect(apiKeyCanActivate).not.toHaveBeenCalled();
    expect(rateLimitCanActivate).toHaveBeenCalledWith(context);
  });

  it('allows AuthType.None without calling credential guards', async () => {
    const { apiKeyCanActivate, guard, jwtCanActivate, rateLimitCanActivate } =
      setup([AuthType.None]);

    await expect(guard.canActivate(context)).resolves.toBe(true);

    expect(jwtCanActivate).not.toHaveBeenCalled();
    expect(apiKeyCanActivate).not.toHaveBeenCalled();
    expect(rateLimitCanActivate).toHaveBeenCalledWith(context);
  });

  it('falls back to ApiKey when Bearer fails on a route that allows both', async () => {
    const { apiKeyCanActivate, guard, jwtCanActivate, rateLimitCanActivate } =
      setup([AuthType.Bearer, AuthType.ApiKey]);
    jwtCanActivate.mockRejectedValue(
      new UnauthorizedException('Invalid bearer'),
    );

    await expect(guard.canActivate(context)).resolves.toBe(true);

    expect(jwtCanActivate).toHaveBeenCalledWith(context);
    expect(apiKeyCanActivate).toHaveBeenCalledWith(context);
    expect(rateLimitCanActivate).toHaveBeenCalledTimes(1);
    expect(rateLimitCanActivate).toHaveBeenCalledWith(context);
  });

  it('propagates rate-limit failures without trying another credential type', async () => {
    const { apiKeyCanActivate, guard, jwtCanActivate, rateLimitCanActivate } =
      setup([AuthType.Bearer, AuthType.ApiKey]);
    rateLimitCanActivate.mockRejectedValue(new Error('rate limited'));

    await expect(guard.canActivate(context)).rejects.toThrow('rate limited');

    expect(jwtCanActivate).toHaveBeenCalledWith(context);
    expect(apiKeyCanActivate).not.toHaveBeenCalled();
  });
});
