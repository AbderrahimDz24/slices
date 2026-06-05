import { ApiProperty } from '@nestjs/swagger';
import { ApiKeyMode } from '@api-keys/models';
import { CreatedApiKey } from '@api-keys/services';

export class CreateApiKeyResponseDto {
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

  @ApiProperty({
    example:
      'ak_test_YXBrX2Y2Mzg4NmEzZmZjMDRmNmIuM1JFbVR4dHd5Sm5FUWRnS0V0bVRYb2dIWUpuMWt3bFdWT1RyX1NUWkR3QQ',
    description: 'Raw API key. This value is returned only once.',
  })
  apiKey: string;

  @ApiProperty({ example: '2025-07-15T10:20:00.000Z' })
  createdAt: Date;

  static fromCreatedApiKey(created: CreatedApiKey): CreateApiKeyResponseDto {
    const dto = new CreateApiKeyResponseDto();
    dto.id = created.apiKey.id;
    dto.name = created.apiKey.name;
    dto.keyPreview = created.apiKey.keyPreview;
    dto.mode = created.apiKey.mode;
    dto.apiKey = created.rawKey;
    dto.createdAt = created.apiKey.createdAt;
    return dto;
  }
}
