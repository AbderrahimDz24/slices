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
    const jwtAuthGuard = {
      canActivate: jest.fn().mockResolvedValue(true),
    } as unknown as JwtAuthGuard;
    const apiKeyAuthGuard = {
      canActivate: jest.fn().mockResolvedValue(true),
    } as unknown as ApiKeyAuthGuard;
    const guard = new AuthenticationGuard(
      reflector,
      jwtAuthGuard,
      apiKeyAuthGuard,
    );

    return {
      apiKeyAuthGuard: apiKeyAuthGuard as CanActivate,
      guard,
      jwtAuthGuard: jwtAuthGuard as CanActivate,
      reflector,
    };
  }

  it('defaults to Bearer authentication', async () => {
    const { apiKeyAuthGuard, guard, jwtAuthGuard } = setup();

    await expect(guard.canActivate(context)).resolves.toBe(true);

    expect(jwtAuthGuard.canActivate).toHaveBeenCalledWith(context);
    expect(apiKeyAuthGuard.canActivate).not.toHaveBeenCalled();
  });

  it('allows AuthType.None without calling credential guards', async () => {
    const { apiKeyAuthGuard, guard, jwtAuthGuard } = setup([AuthType.None]);

    await expect(guard.canActivate(context)).resolves.toBe(true);

    expect(jwtAuthGuard.canActivate).not.toHaveBeenCalled();
    expect(apiKeyAuthGuard.canActivate).not.toHaveBeenCalled();
  });

  it('falls back to ApiKey when Bearer fails on a route that allows both', async () => {
    const { apiKeyAuthGuard, guard, jwtAuthGuard } = setup([
      AuthType.Bearer,
      AuthType.ApiKey,
    ]);
    jest
      .spyOn(jwtAuthGuard, 'canActivate')
      .mockRejectedValue(new UnauthorizedException('Invalid bearer'));

    await expect(guard.canActivate(context)).resolves.toBe(true);

    expect(jwtAuthGuard.canActivate).toHaveBeenCalledWith(context);
    expect(apiKeyAuthGuard.canActivate).toHaveBeenCalledWith(context);
  });
});
