import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Product } from '@products/models';

@Injectable()
export class GetProductByIdRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.findOneBy({ id });
  }
}
