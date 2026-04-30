import { Module } from '@nestjs/common';
import { ProductsCoreModule } from '@products/core';
import { UpdateProductController } from './update-product.controller';
import { UpdateProductHandler } from './update-product.handler';

@Module({
  imports: [ProductsCoreModule],
  controllers: [UpdateProductController],
  providers: [UpdateProductHandler],
})
export class UpdateProductModule {}
