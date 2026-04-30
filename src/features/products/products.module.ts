import { Module } from '@nestjs/common';
import { CreateProductModule } from './slices/create-product/create-product.module';
import { DeleteProductModule } from './slices/delete-product/delete-product.module';
import { GetProductByIdModule } from './slices/get-product-by-id/get-product-by-id.module';
import { GetProductsModule } from './slices/get-products/get-products.module';
import { UpdateProductModule } from './slices/update-product/update-product.module';

@Module({
  imports: [
    CreateProductModule,
    UpdateProductModule,
    GetProductByIdModule,
    GetProductsModule,
    DeleteProductModule,
  ],
})
export class ProductsModule {}
