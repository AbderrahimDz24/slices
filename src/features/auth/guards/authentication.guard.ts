import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApiKeyAuthGuard } from '@api-keys/guards';
import { AuthType } from '@auth/enums';
import { isObservable, lastValueFrom, Observable } from 'rxjs';
import { AUTH_TYPE_KEY } from '../decorators/auth.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';

type GuardResult = boolean | Promise<boolean> | Observable<boolean>;

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthTypes = [AuthType.Bearer];

  constructor(
    private readonly reflector: Reflector,
    private readonly jwtAuthGuard: JwtAuthGuard,
    private readonly apiKeyAuthGuard: ApiKeyAuthGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes =
      this.reflector.getAllAndOverride<AuthType[]>(AUTH_TYPE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? AuthenticationGuard.defaultAuthTypes;

    let error = new UnauthorizedException();

    for (const authType of authTypes) {
      const guard = this.guardFor(authType);
      try {
        const canActivate = await this.resolveGuardResult(
          guard.canActivate(context),
        );
        if (canActivate) {
          return true;
        }
      } catch (err) {
        error = err instanceof UnauthorizedException ? err : error;
      }
    }

    throw error;
  }

  private guardFor(authType: AuthType): CanActivate {
    switch (authType) {
      case AuthType.Bearer:
        return this.jwtAuthGuard;
      case AuthType.ApiKey:
        return this.apiKeyAuthGuard;
      case AuthType.None:
        return { canActivate: () => true };
    }
  }

  private async resolveGuardResult(result: GuardResult): Promise<boolean> {
    if (isObservable(result)) {
      return lastValueFrom(result);
    }
    return result;
  }
}
