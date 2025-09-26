import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../_shared/product.entity';
import { DeleteProductController } from './delete-product.controller';
import { DeleteProductHandler } from './delete-product.handler';
import { DeleteProductService } from './delete-product.service';
import { DeleteProductRepository } from './delete-product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [DeleteProductController],
  providers: [
    DeleteProductHandler,
    DeleteProductService,
    DeleteProductRepository,
  ],
})
export class DeleteProductModule {}
