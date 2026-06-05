import { Module } from '@nestjs/common';
import { WalletsCoreModule } from '@wallets/core';
import { CreateDepositController } from './create-deposit.controller';
import { CreateDepositHandler } from './create-deposit.handler';

@Module({
  imports: [WalletsCoreModule],
  controllers: [CreateDepositController],
  providers: [CreateDepositHandler],
})
export class CreateDepositModule {}
