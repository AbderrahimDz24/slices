import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { RefreshTokenRequestDto } from './dtos/refresh-token.request.dto';
import { SigninResponseDto } from '@auth/dtos';

/**
 * Swagger docs for refresh-token endpoint
 */
export function RefreshTokenDocs() {
  return applyDecorators(
    ApiBody({ type: RefreshTokenRequestDto }),
    ApiOkResponse({
      type: SigninResponseDto,
      description: 'Refresh successful; returns new access and refresh tokens',
    }),
  );
}
