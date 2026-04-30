import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { SigninRequestDto } from './dtos/signin.request.dto';
import { SigninResponseDto } from './dtos/signin.response.dto';

/**
 * Custom decorator that groups Swagger docs for the Signin endpoint.
 */
export function SigninDocs() {
  return applyDecorators(
    ApiBody({ type: SigninRequestDto }),
    ApiOkResponse({
      type: SigninResponseDto,
      description: 'Signin successful; returns access and refresh tokens',
    }),
  );
}
