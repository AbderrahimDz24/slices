import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Product } from '../_shared/product.entity';

@Injectable()
export class CreateProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async createProduct(
    name: string,
    price: number,
    description?: string,
    category?: string,
    image?: string,
  ): Promise<Product> {
    const product = this.create({ name, price, description, category, image });
    await this.save(product);
    return product;
  }
}
