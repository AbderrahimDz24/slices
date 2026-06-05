import { Module } from '@nestjs/common';
import { CreateDepositModule } from './slices/create-deposit/create-deposit.module';
import { GetAccountBalanceModule } from './slices/get-account-balance/get-account-balance.module';

@Module({
  imports: [CreateDepositModule, GetAccountBalanceModule],
})
export class WalletsModule {}
