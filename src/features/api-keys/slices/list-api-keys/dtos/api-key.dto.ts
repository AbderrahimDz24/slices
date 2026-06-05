import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApiKey, ApiKeyMode } from '@api-keys/models';

export class ApiKeyDto {
  @ApiProperty({ example: 'apk_f63886a3ffc04f6b' })
  id: string;

  @ApiProperty({ example: 'Mobile app integration' })
  name: string;

  @ApiProperty({
    example: 'ak_test_YXBrX2Y2Mzg4NmEzZmZjMDRmNmIu',
    description: 'Non-secret literal preview of the raw API key.',
  })
  keyPreview: string;

  @ApiProperty({ enum: ApiKeyMode, example: ApiKeyMode.Test })
  mode: ApiKeyMode;

  @ApiPropertyOptional({
    example: '2025-07-15T10:20:00.000Z',
    nullable: true,
  })
  lastUsedAt: Date | null;

  @ApiProperty({ example: '2025-07-15T10:20:00.000Z' })
  createdAt: Date;

  static fromEntity(apiKey: ApiKey): ApiKeyDto {
    const dto = new ApiKeyDto();
    dto.id = apiKey.id;
    dto.name = apiKey.name;
    dto.keyPreview = apiKey.keyPreview;
    dto.mode = apiKey.mode;
    dto.lastUsedAt = apiKey.lastUsedAt;
    dto.createdAt = apiKey.createdAt;
    return dto;
  }
}
