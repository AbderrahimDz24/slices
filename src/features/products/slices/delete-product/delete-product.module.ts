import { Module } from '@nestjs/common';
import { ProductsCoreModule } from '@products/core';
import { DeleteProductController } from './delete-product.controller';
import { DeleteProductHandler } from './delete-product.handler';

@Module({
  imports: [ProductsCoreModule],
  controllers: [DeleteProductController],
  providers: [DeleteProductHandler],
})
export class DeleteProductModule {}
