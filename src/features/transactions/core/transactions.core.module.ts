import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsCoreModule } from '@products/core';
import { WalletsCoreModule } from '@wallets/core';
import { ProviderDispatchOutbox, Transaction } from '@transactions/models';
import {
  ProviderDispatchOutboxRepository,
  TransactionRepository,
} from '@transactions/repositories';
import {
  CreateMobileTopupTransactionService,
  ProviderDispatchOutboxService,
  ProviderDispatchQueueService,
  ReadMobileTopupTransactionService,
} from '@transactions/services';

const providers = [
  TransactionRepository,
  ProviderDispatchOutboxRepository,
  ProviderDispatchQueueService,
  ProviderDispatchOutboxService,
  CreateMobileTopupTransactionService,
  ReadMobileTopupTransactionService,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, ProviderDispatchOutbox]),
    ProductsCoreModule,
    WalletsCoreModule,
  ],
  providers,
  exports: [TypeOrmModule, ...providers],
})
export class TransactionsCoreModule {}
