import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateUserRequestDto } from './dtos/create-user.request.dto';
import { CreateUserResponseDto } from './dtos/create-user.response.dto';

export function CreateUserDocs() {
  return applyDecorators(
    ApiBody({ type: CreateUserRequestDto }),
    ApiCreatedResponse({
      type: CreateUserResponseDto,
      description: 'User successfully created by an ADMIN',
    }),
  );
}
