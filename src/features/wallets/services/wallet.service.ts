import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import {
  Wallet,
  WalletLedgerEntry,
  WalletLedgerEntryType,
} from '@wallets/models';
import {
  WalletLedgerEntryRepository,
  WalletRepository,
} from '@wallets/repositories';

@Injectable()
export class WalletService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly walletRepository: WalletRepository,
    private readonly ledgerEntryRepository: WalletLedgerEntryRepository,
  ) {}

  createWalletForUser(
    userId: string,
    manager?: EntityManager,
  ): Promise<Wallet> {
    return this.walletRepository.createForUser(userId, manager);
  }

  async getAccountBalance(userId: string): Promise<Wallet> {
    const wallet = await this.walletRepository.findByUserId(userId);
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    return wallet;
  }

  async createDeposit(
    userId: string,
    amount: number,
    actorUserId: string,
    note?: string,
  ): Promise<WalletLedgerEntry> {
    return this.dataSource.transaction(async (manager) => {
      const wallet = await this.walletRepository.findByUserIdForUpdate(
        userId,
        manager,
      );
      if (!wallet) {
        throw new NotFoundException('Wallet not found');
      }

      wallet.availableBalance += amount;
      const savedWallet = await manager.getRepository(Wallet).save(wallet);

      return this.ledgerEntryRepository.createEntry(
        {
          walletId: savedWallet.id,
          userId: savedWallet.userId,
          type: WalletLedgerEntryType.DEPOSIT,
          amount,
          currency: savedWallet.currency,
          availableBalanceDelta: amount,
          reservedBalanceDelta: 0,
          availableBalanceAfter: savedWallet.availableBalance,
          reservedBalanceAfter: savedWallet.reservedBalance,
          actorUserId,
          note: note ?? null,
        },
        manager,
      );
    });
  }

  async reserveFundsForTransaction(
    userId: string,
    transactionId: string,
    amount: number,
    manager: EntityManager,
  ): Promise<WalletLedgerEntry> {
    const wallet = await this.walletRepository.findByUserIdForUpdate(
      userId,
      manager,
    );
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    if (wallet.availableBalance < amount) {
      throw new ConflictException('Insufficient available wallet balance');
    }

    wallet.availableBalance -= amount;
    wallet.reservedBalance += amount;
    const savedWallet = await manager.getRepository(Wallet).save(wallet);

    return this.ledgerEntryRepository.createEntry(
      {
        walletId: savedWallet.id,
        userId: savedWallet.userId,
        transactionId,
        type: WalletLedgerEntryType.RESERVATION,
        amount,
        currency: savedWallet.currency,
        availableBalanceDelta: -amount,
        reservedBalanceDelta: amount,
        availableBalanceAfter: savedWallet.availableBalance,
        reservedBalanceAfter: savedWallet.reservedBalance,
        actorUserId: null,
        note: null,
      },
      manager,
    );
  }
}
