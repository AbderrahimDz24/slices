import { Injectable } from '@nestjs/common';
import { CreateProductRepository } from './create-product.repository';
import { Product } from '../_shared/product.entity';

@Injectable()
export class CreateProductService {
  constructor(private readonly productRepository: CreateProductRepository) {}

  async createProduct(
    name: string,
    price: number,
    description?: string,
    category?: string,
    image?: string,
  ): Promise<Product> {
    return this.productRepository.createProduct(
      name,
      price,
      description,
      category,
      image,
    );
  }
}
