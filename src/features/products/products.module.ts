import { Module } from '@nestjs/common';
import { GetOffersModule } from './slices/get-offers/get-offers.module';

@Module({
  imports: [GetOffersModule],
})
export class ProductsModule {}
