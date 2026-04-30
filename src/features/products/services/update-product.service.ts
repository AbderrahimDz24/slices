import { Injectable } from '@nestjs/common';
import { Product } from '@products/models';
import { UpdateProductRepository } from '@products/repositories';

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
