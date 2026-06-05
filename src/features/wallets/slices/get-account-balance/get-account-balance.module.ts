import { Module } from '@nestjs/common';
import { WalletsCoreModule } from '@wallets/core';
import { GetAccountBalanceController } from './get-account-balance.controller';
import { GetAccountBalanceHandler } from './get-account-balance.handler';

@Module({
  imports: [WalletsCoreModule],
  controllers: [GetAccountBalanceController],
  providers: [GetAccountBalanceHandler],
})
export class GetAccountBalanceModule {}
