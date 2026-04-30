import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { SignupRequestDto } from './dtos/signup.request.dto';
import { SignupResponseDto } from './dtos/signup.response.dto';

/**
 * Custom decorator that groups Swagger docs for the Signup endpoint.
 */
export function SignupDocs() {
  return applyDecorators(
    ApiBody({ type: SignupRequestDto }),
    ApiCreatedResponse({
      type: SignupResponseDto,
      description: 'User successfully registered',
    }),
  );
}
