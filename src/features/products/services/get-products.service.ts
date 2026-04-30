import { Injectable } from '@nestjs/common';
import { Product } from '@products/models';
import { GetProductsRepository } from '@products/repositories';

export type ProductSort = 'price_asc' | 'price_desc';

@Injectable()
export class GetProductsService {
  constructor(private readonly productRepository: GetProductsRepository) {}

  async getProducts(category?: string, sort?: ProductSort): Promise<Product[]> {
    return this.productRepository.getProducts({ category, sort });
  }
}
