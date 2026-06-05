/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import type { ActiveUserData } from '@auth/common';
import { AuthType } from '@auth/enums';
import { ApiKeysService } from '@api-keys/services';

interface RequestWithUser extends Request {
  user?: ActiveUserData;
}

@Injectable()
export class ApiKeyAuthGuard implements CanActivate {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const rawKey = this.extractKeyFromHeader(request);
    if (!rawKey) {
      throw new UnauthorizedException('Missing API key');
    }

    const apiKey = await this.apiKeysService.validateSubmittedKey(rawKey);
    if (!apiKey) {
      throw new UnauthorizedException('Invalid API key');
    }

    request.user = {
      sub: apiKey.user.id,
      email: apiKey.user.email,
      role: apiKey.user.role,
      authType: AuthType.ApiKey,
      apiKeyId: apiKey.id,
    } as ActiveUserData;

    return true;
  }

  private extractKeyFromHeader(request: Request): string | undefined {
    const auth =
      request.headers['authorization'] || request.headers['Authorization'];
    if (!auth || typeof auth !== 'string') {
      return undefined;
    }

    const [scheme, key] = auth.split(' ');
    return scheme === AuthType.ApiKey && key ? key : undefined;
  }
}
