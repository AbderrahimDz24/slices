import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Product } from '../_shared/product.entity';

@Injectable()
export class DeleteProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async deleteProduct(id: number): Promise<void> {
    const result = await this.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  }
}
