import { Product } from '../../_shared/product.entity';

export class GetProductsResponseDto {
  products: Product[];

  static fromEntities(products: Product[]): GetProductsResponseDto {
    return { products };
  }
}
