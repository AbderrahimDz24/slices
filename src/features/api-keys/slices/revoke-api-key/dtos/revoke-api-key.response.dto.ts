import { ApiProperty } from '@nestjs/swagger';

export class RevokeApiKeyResponseDto {
  @ApiProperty({
    example: 'apk_f63886a3ffc04f6b',
    description: 'Identifier of the revoked API key',
  })
  id: string;
}
