import { Injectable } from '@nestjs/common';
import { UpdateProductRepository } from './update-product.repository';
import { Product } from '../_shared/product.entity';

@Injectable()
export class UpdateProductService {
  constructor(private readonly productRepository: UpdateProductRepository) {}

  async updateProduct(
    id: number,
    name?: string,
    price?: number,
    description?: string,
    category?: string,
    image?: string,
  ): Promise<Product> {
    return this.productRepository.updateProduct(id, {
      name,
      price,
      description,
      category,
      image,
    });
  }
}
