import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../_shared/product.entity';
import { UpdateProductController } from './update-product.controller';
import { UpdateProductHandler } from './update-product.handler';
import { UpdateProductService } from './update-product.service';
import { UpdateProductRepository } from './update-product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [UpdateProductController],
  providers: [
    UpdateProductHandler,
    UpdateProductService,
    UpdateProductRepository,
  ],
})
export class UpdateProductModule {}
