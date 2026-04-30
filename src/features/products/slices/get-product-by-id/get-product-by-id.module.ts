import { Module } from '@nestjs/common';
import { ProductsCoreModule } from '@products/core';
import { GetProductByIdController } from './get-product-by-id.controller';
import { GetProductByIdHandler } from './get-product-by-id.handler';

@Module({
  imports: [ProductsCoreModule],
  controllers: [GetProductByIdController],
  providers: [GetProductByIdHandler],
})
export class GetProductByIdModule {}
