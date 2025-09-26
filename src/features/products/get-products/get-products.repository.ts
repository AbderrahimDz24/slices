import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { Product } from '../_shared/product.entity';
import { GetProductsOptions } from './interfaces/get-products-options.interface';

@Injectable()
export class GetProductsRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async getProducts(options: GetProductsOptions = {}): Promise<Product[]> {
    const where: FindOptionsWhere<Product> = {};
    if (options.category) {
      where.category = options.category;
    }

    const order =
      options.sort === 'price_asc'
        ? { price: 'ASC' as const }
        : options.sort === 'price_desc'
          ? { price: 'DESC' as const }
          : undefined;

    return this.find({ where, order });
  }
}
