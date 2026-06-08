import { Module } from '@nestjs/common';
import { CreateMobileTopupModule } from './slices/create-mobile-topup/create-mobile-topup.module';
import { GetMobileTopupModule } from './slices/get-mobile-topup/get-mobile-topup.module';

@Module({
  imports: [CreateMobileTopupModule, GetMobileTopupModule],
})
export class TransactionsModule {}
