import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { ActiveUserData } from '@auth/common';

interface RequestWithUser {
  user: ActiveUserData;
}

export const ActiveUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): ActiveUserData => {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  },
);
