import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from './product.dto';
import { Product } from '../../_shared/product.entity';

export class GetProductsResponseDto {
  @ApiProperty({ type: [ProductDto] })
  products: ProductDto[];

  static fromEntities(products: Product[]): GetProductsResponseDto {
    const dto = new GetProductsResponseDto();
    dto.products = products.map((p) => ProductDto.fromEntity(p));
    return dto;
  }
}
