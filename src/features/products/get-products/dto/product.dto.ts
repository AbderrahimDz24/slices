import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../_shared/product.entity';

export class ProductDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Wireless Mouse' })
  name: string;

  @ApiProperty({ example: 19.99, type: Number })
  price: number;

  @ApiProperty({
    example: 'Ergonomic wireless mouse',
    required: false,
    nullable: true,
  })
  description: string;

  @ApiProperty({ example: 'Electronics', required: false, nullable: true })
  category: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    required: false,
    nullable: true,
  })
  image: string;

  static fromEntity(product: Product): ProductDto {
    const dto = new ProductDto();
    dto.id = product.id;
    dto.name = product.name;
    dto.price = product.price;
    dto.description = product.description;
    dto.category = product.category;
    dto.image = product.image;
    return dto;
  }
}
