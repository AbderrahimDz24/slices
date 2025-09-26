import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { SigninRequestDto } from './dto/signin.request.dto';
import { SigninResponseDto } from './dto/signin.response.dto';

/**
 * Custom decorator that groups Swagger docs for the Signin endpoint.
 */
export function SigninDocs() {
  return applyDecorators(
    ApiBody({ type: SigninRequestDto }),
    ApiOkResponse({
      type: SigninResponseDto,
      description: 'Signin successful; returns access token',
    }),
  );
}
