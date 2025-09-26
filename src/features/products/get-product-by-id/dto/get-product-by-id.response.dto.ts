import { Product } from '../../_shared/product.entity';

export class GetProductByIdResponseDto {
  id: number;
  name: string;
  price: number;
  description?: string;
  category?: string;
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
