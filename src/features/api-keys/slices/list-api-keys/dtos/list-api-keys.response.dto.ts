import { ApiProperty } from '@nestjs/swagger';
import { ApiKey } from '@api-keys/models';
import { ApiKeyDto } from './api-key.dto';

export class ListApiKeysResponseDto {
  @ApiProperty({ type: [ApiKeyDto] })
  apiKeys: ApiKeyDto[];

  static fromEntities(apiKeys: ApiKey[]): ListApiKeysResponseDto {
    const dto = new ListApiKeysResponseDto();
    dto.apiKeys = apiKeys.map((apiKey) => ApiKeyDto.fromEntity(apiKey));
    return dto;
  }
}
