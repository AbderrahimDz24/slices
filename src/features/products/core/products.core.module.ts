import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@products/models';
import {
  CreateProductRepository,
  DeleteProductRepository,
  GetProductByIdRepository,
  GetProductsRepository,
  UpdateProductRepository,
} from '@products/repositories';
import {
  CreateProductService,
  DeleteProductService,
  GetProductByIdService,
  GetProductsService,
  UpdateProductService,
} from '@products/services';

const providers = [
  CreateProductRepository,
  CreateProductService,
  DeleteProductRepository,
  DeleteProductService,
  GetProductByIdRepository,
  GetProductByIdService,
  GetProductsRepository,
  GetProductsService,
  UpdateProductRepository,
  UpdateProductService,
];

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers,
  exports: [TypeOrmModule, ...providers],
})
export class ProductsCoreModule {}
