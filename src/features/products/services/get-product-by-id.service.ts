import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@products/models';
import { GetProductByIdRepository } from '@products/repositories';

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
