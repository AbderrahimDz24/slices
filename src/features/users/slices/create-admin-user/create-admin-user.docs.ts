import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateAdminUserRequestDto } from './dtos/create-admin-user.request.dto';
import { CreateAdminUserResponseDto } from './dtos/create-admin-user.response.dto';

export function CreateAdminUserDocs() {
  return applyDecorators(
    ApiBody({ type: CreateAdminUserRequestDto }),
    ApiCreatedResponse({
      type: CreateAdminUserResponseDto,
      description: 'User successfully created by an OWNER',
    }),
  );
}
