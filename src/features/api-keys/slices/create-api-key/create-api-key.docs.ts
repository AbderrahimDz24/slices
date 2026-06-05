import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateApiKeyRequestDto } from './dtos/create-api-key.request.dto';
import { CreateApiKeyResponseDto } from './dtos/create-api-key.response.dto';

export function CreateApiKeyDocs() {
  return applyDecorators(
    ApiBody({ type: CreateApiKeyRequestDto }),
    ApiCreatedResponse({
      type: CreateApiKeyResponseDto,
      description:
        'API key created. The raw key is returned once and cannot be retrieved later.',
    }),
  );
}
