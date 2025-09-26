import { Injectable } from '@nestjs/common';
import { GetProductsRepository } from './get-products.repository';

import { Product } from '../_shared/product.entity';
import { ProductSort } from './get-products.query';

@Injectable()
export class GetProductsService {
  constructor(private readonly productRepository: GetProductsRepository) {}

  async getProducts(category?: string, sort?: ProductSort): Promise<Product[]> {
    return this.productRepository.getProducts({ category, sort });
  }
}
