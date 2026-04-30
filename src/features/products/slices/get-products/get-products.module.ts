import { Module } from '@nestjs/common';
import { ProductsCoreModule } from '@products/core';
import { GetProductsController } from './get-products.controller';
import { GetProductsHandler } from './get-products.handler';

@Module({
  imports: [ProductsCoreModule],
  controllers: [GetProductsController],
  providers: [GetProductsHandler],
})
export class GetProductsModule {}
