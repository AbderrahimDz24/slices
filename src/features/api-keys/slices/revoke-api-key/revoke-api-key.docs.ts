import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { RevokeApiKeyResponseDto } from './dtos/revoke-api-key.response.dto';

export function RevokeApiKeyDocs() {
  return applyDecorators(
    ApiOkResponse({
      type: RevokeApiKeyResponseDto,
      description: 'API key revoked',
    }),
  );
}
