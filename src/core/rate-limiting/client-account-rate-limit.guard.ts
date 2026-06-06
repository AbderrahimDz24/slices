import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { createHash } from 'node:crypto';
import {
  InjectThrottlerOptions,
  InjectThrottlerStorage,
  ThrottlerException,
  ThrottlerGuard,
  type ThrottlerModuleOptions,
  type ThrottlerStorage,
} from '@nestjs/throttler';
import { UserRoles } from '@common/enums';
import { CLIENT_ACCOUNT_RATE_LIMIT_KEY } from './client-account-rate-limit.constants';

interface RequestWithActiveUser {
  user?: {
    sub?: string;
    role?: UserRoles;
  };
}

@Injectable()
export class ClientAccountRateLimitGuard extends ThrottlerGuard {
  private readonly logger = new Logger(ClientAccountRateLimitGuard.name);

  constructor(
    @InjectThrottlerOptions()
    options: ThrottlerModuleOptions,
    @InjectThrottlerStorage()
    storageService: ThrottlerStorage,
    reflector: Reflector,
  ) {
    super(options, storageService, reflector);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      return await super.canActivate(context);
    } catch (error) {
      if (error instanceof ThrottlerException) {
        throw error;
      }

      this.logger.warn(
        `Rate limit storage unavailable; allowing request: ${this.formatError(error)}`,
      );
      return true;
    }
  }

  protected async shouldSkip(context: ExecutionContext): Promise<boolean> {
    const isRateLimitedRoute = this.reflector.getAllAndOverride<boolean>(
      CLIENT_ACCOUNT_RATE_LIMIT_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!isRateLimitedRoute) {
      return true;
    }

    const request = this.getRequest(context);
    return !request.user?.sub || request.user.role !== UserRoles.REGULAR;
  }

  protected async getTracker(req: RequestWithActiveUser): Promise<string> {
    return `client-account:${req.user!.sub}`;
  }

  protected generateKey(
    _context: ExecutionContext,
    tracker: string,
    throttlerName: string,
  ): string {
    return createHash('sha256')
      .update(`${throttlerName}:${tracker}`, 'utf8')
      .digest('hex');
  }

  private getRequest(context: ExecutionContext): RequestWithActiveUser {
    return context.switchToHttp().getRequest<RequestWithActiveUser>();
  }

  private formatError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }
}
