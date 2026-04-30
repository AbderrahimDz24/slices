import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Product } from '@products/models';

@Injectable()
export class UpdateProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async updateProduct(
    id: number,
    fields: Partial<
      Pick<Product, 'name' | 'price' | 'description' | 'category' | 'image'>
    >,
  ): Promise<Product> {
    const product = await this.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    Object.assign(product, fields);
    await this.save(product);
    return product;
  }
}
