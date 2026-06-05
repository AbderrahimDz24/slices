import { Module } from '@nestjs/common';
import { ProductsCoreModule } from '@products/core';
import { GetOffersController } from './get-offers.controller';
import { GetOffersHandler } from './get-offers.handler';

@Module({
  imports: [ProductsCoreModule],
  controllers: [GetOffersController],
  providers: [GetOffersHandler],
})
export class GetOffersModule {}
