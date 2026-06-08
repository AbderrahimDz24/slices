import { Module } from '@nestjs/common';
import { TransactionsCoreModule } from '@transactions/core';
import { GetMobileTopupByExternalIdHandler } from './get-mobile-topup-by-external-id.handler';
import { GetMobileTopupByIdHandler } from './get-mobile-topup-by-id.handler';
import { GetMobileTopupController } from './get-mobile-topup.controller';

@Module({
  imports: [TransactionsCoreModule],
  controllers: [GetMobileTopupController],
  providers: [GetMobileTopupByExternalIdHandler, GetMobileTopupByIdHandler],
})
export class GetMobileTopupModule {}
