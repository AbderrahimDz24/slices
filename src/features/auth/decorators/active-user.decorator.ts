import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { ActiveUserData } from '@auth/common';

export const ActiveUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): ActiveUserData => {
    const request = context.switchToHttp().getRequest();
    return request.user as ActiveUserData;
  },
);
