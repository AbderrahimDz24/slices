import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Product } from '../../_shared/product.entity';

export class GetProductByIdResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Wireless Mouse' })
  name: string;

  @ApiProperty({ example: 19.99, type: Number })
  price: number;

  @ApiPropertyOptional({ example: 'Ergonomic wireless mouse', nullable: true })
  description?: string;

  @ApiPropertyOptional({ example: 'Electronics', nullable: true })
  category?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/image.jpg',
    nullable: true,
  })
  image?: string;

  static fromEntity(product: Product): GetProductByIdResponseDto {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
    };
  }
}
