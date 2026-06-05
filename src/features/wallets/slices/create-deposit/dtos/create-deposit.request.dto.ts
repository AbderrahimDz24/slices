import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateDepositRequestDto {
  @ApiProperty({
    example: 5000,
    description: 'Positive whole-DZD amount to deposit',
  })
  @IsInt()
  @IsPositive()
  amount: number;

  @ApiPropertyOptional({
    example: 'Initial funding',
    description: 'Optional administrative note for the deposit',
  })
  @IsString()
  @IsOptional()
  note?: string;
}
