import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateApiKeyRequestDto {
  @ApiProperty({
    example: 'Mobile app integration',
    description: 'Human-readable API key name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
