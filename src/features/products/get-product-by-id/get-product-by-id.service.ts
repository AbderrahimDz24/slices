import { Injectable, NotFoundException } from '@nestjs/common';
import { GetProductByIdRepository } from './get-product-by-id.repository';

import { Product } from '../_shared/product.entity';

@Injectable()
export class GetProductByIdService {
  constructor(private readonly productRepository: GetProductByIdRepository) {}

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository.getProductById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
