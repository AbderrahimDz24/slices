import { Module } from '@nestjs/common';
import { CreateProductController } from './create-product.controller';
import { CreateProductHandler } from './create-product.handler';
import { CreateProductService } from './create-product.service';
import { CreateProductRepository } from './create-product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from '../_shared/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [CreateProductController],
  providers: [
    CreateProductHandler,
    CreateProductService,
    CreateProductRepository,
  ],
})
export class CreateProductModule {}
