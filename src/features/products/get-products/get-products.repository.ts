import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Product } from '../_shared/product.entity';

@Injectable()
export class GetProductsRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async getProducts(): Promise<Product[]> {
    return this.find();
  }
}
