import { Module } from '@nestjs/common';
import { GetProductByIdController } from './get-product-by-id.controller';
import { GetProductByIdHandler } from './get-product-by-id.handler';
import { GetProductByIdService } from './get-product-by-id.service';
import { GetProductByIdRepository } from './get-product-by-id.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from '../_shared/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [GetProductByIdController],
  providers: [
    GetProductByIdHandler,
    GetProductByIdService,
    GetProductByIdRepository,
  ],
})
export class GetProductByIdModule {}
