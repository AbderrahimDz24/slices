import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthType } from '@auth/enums';
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
    const guard = new AuthenticationGuard(
      reflector,
      jwtAuthGuard,
      apiKeyAuthGuard,
    );

    return {
      apiKeyCanActivate,
      apiKeyAuthGuard: apiKeyAuthGuard as CanActivate,
      guard,
      jwtCanActivate,
      jwtAuthGuard: jwtAuthGuard as CanActivate,
      reflector,
    };
  }

  it('defaults to Bearer authentication', async () => {
    const { apiKeyCanActivate, guard, jwtCanActivate } = setup();

    await expect(guard.canActivate(context)).resolves.toBe(true);

    expect(jwtCanActivate).toHaveBeenCalledWith(context);
    expect(apiKeyCanActivate).not.toHaveBeenCalled();
  });

  it('allows AuthType.None without calling credential guards', async () => {
    const { apiKeyCanActivate, guard, jwtCanActivate } = setup([AuthType.None]);

    await expect(guard.canActivate(context)).resolves.toBe(true);

    expect(jwtCanActivate).not.toHaveBeenCalled();
    expect(apiKeyCanActivate).not.toHaveBeenCalled();
  });

  it('falls back to ApiKey when Bearer fails on a route that allows both', async () => {
    const { apiKeyCanActivate, guard, jwtCanActivate } = setup([
      AuthType.Bearer,
      AuthType.ApiKey,
    ]);
    jwtCanActivate.mockRejectedValue(
      new UnauthorizedException('Invalid bearer'),
    );

    await expect(guard.canActivate(context)).resolves.toBe(true);

    expect(jwtCanActivate).toHaveBeenCalledWith(context);
    expect(apiKeyCanActivate).toHaveBeenCalledWith(context);
  });
});
