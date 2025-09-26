import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class CreateProductRequestDto {
  @ApiProperty({ example: 'Wireless Mouse', description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 19.99, type: Number, description: 'Product price' })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiPropertyOptional({
    example: 'Ergonomic wireless mouse',
    description: 'Optional product description',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: 'Electronics',
    description: 'Optional product category',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/image.jpg',
    description: 'Optional product image URL',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  image?: string;
}
