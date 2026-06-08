import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class GetMobileTopupByExternalIdRequestDto {
  @ApiProperty({
    example: 'client-order-10001',
    description: 'Client reconciliation identifier',
    maxLength: 128,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  externalId: string;
}
