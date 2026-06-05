import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet, WalletLedgerEntry } from '@wallets/models';
import {
  WalletLedgerEntryRepository,
  WalletRepository,
} from '@wallets/repositories';
import { WalletService } from '@wallets/services';

const providers = [
  WalletRepository,
  WalletLedgerEntryRepository,
  WalletService,
];

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, WalletLedgerEntry])],
  providers,
  exports: [TypeOrmModule, ...providers],
})
export class WalletsCoreModule {}
