import { Injectable } from '@nestjs/common';
import { GetProductsRepository } from './get-products.repository';

import { Product } from '../_shared/product.entity';

@Injectable()
export class GetProductsService {
  constructor(private readonly productRepository: GetProductsRepository) {}

  async getProducts(): Promise<Product[]> {
    return this.productRepository.getProducts();
  }
}
