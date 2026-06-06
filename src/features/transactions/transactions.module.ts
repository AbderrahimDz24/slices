import { Module } from '@nestjs/common';
import { CreateMobileTopupModule } from './slices/create-mobile-topup/create-mobile-topup.module';

@Module({
  imports: [CreateMobileTopupModule],
})
export class TransactionsModule {}
