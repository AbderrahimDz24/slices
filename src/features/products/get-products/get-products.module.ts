import { Module } from '@nestjs/common';
import { GetProductsController } from './get-products.controller';
import { GetProductsHandler } from './get-products.handler';
import { GetProductsService } from './get-products.service';
import { GetProductsRepository } from './get-products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from '../_shared/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [GetProductsController],
  providers: [GetProductsHandler, GetProductsService, GetProductsRepository],
})
export class GetProductsModule {}
