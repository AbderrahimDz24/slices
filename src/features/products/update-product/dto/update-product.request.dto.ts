import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, IsOptional } from 'class-validator';

export class UpdateProductRequestDto {
  @ApiPropertyOptional({
    example: 'Wireless Mouse',
    description: 'New product name',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: 24.99,
    type: Number,
    description: 'New product price',
    nullable: true,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({ example: 'Updated description', nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'Accessories', nullable: true })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/new-image.jpg',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  image?: string;
}
