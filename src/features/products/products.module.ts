import { Module } from '@nestjs/common';
import { CreateProductModule } from './create-product/create-product.module';
import { GetProductByIdModule } from './get-product-by-id/get-product-by-id.module';
import { GetProductsModule } from './get-products/get-products.module';
import { UpdateProductModule } from './update-product/update-product.module';
import { DeleteProductModule } from './delete-product/delete-product.module';

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
