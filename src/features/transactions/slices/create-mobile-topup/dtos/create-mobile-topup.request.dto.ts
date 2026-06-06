import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { MOBILE_TOPUP_MSISDN_PATTERN } from '@transactions/services';

export class CreateMobileTopupRequestDto {
  @ApiProperty({
    example: 'off_mobilis__prepaid',
    description: 'Active MOBILE_TOPUP offer id',
  })
  @IsString()
  @IsNotEmpty()
  offerId: string;

  @ApiProperty({
    example: '+213612345678',
    description: 'Recipient MSISDN in Algerian E.164 format',
  })
  @IsString()
  @Matches(MOBILE_TOPUP_MSISDN_PATTERN)
  msisdn: string;

  @ApiProperty({
    example: 1000,
    description: 'Whole-DZD topup amount',
  })
  @IsInt()
  amount: number;

  @ApiPropertyOptional({
    example: 'client-order-10001',
    description: 'Optional client reconciliation identifier',
    maxLength: 128,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  externalId?: string;
}
