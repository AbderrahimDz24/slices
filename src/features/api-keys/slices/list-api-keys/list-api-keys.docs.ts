import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { ListApiKeysResponseDto } from './dtos/list-api-keys.response.dto';

export function ListApiKeysDocs() {
  return applyDecorators(
    ApiOkResponse({
      type: ListApiKeysResponseDto,
      description: 'Active API keys for the current client account',
    }),
  );
}
