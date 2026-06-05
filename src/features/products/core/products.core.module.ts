import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer, Product } from '@products/models';
import { OfferRepository } from '@products/repositories';
import { GetOffersService } from '@products/services';

const providers = [OfferRepository, GetOffersService];

@Module({
  imports: [TypeOrmModule.forFeature([Product, Offer])],
  providers,
  exports: [TypeOrmModule, ...providers],
})
export class ProductsCoreModule {}
