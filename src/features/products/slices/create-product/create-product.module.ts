import { Module } from '@nestjs/common';
import { ProductsCoreModule } from '@products/core';
import { CreateProductController } from './create-product.controller';
import { CreateProductHandler } from './create-product.handler';

@Module({
  imports: [ProductsCoreModule],
  controllers: [CreateProductController],
  providers: [CreateProductHandler],
})
export class CreateProductModule {}
