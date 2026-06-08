import { Injectable, NotFoundException } from '@nestjs/common';
import { Transaction } from '@transactions/models';
import { TransactionRepository } from '@transactions/repositories';

@Injectable()
export class ReadMobileTopupTransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async getById(userId: string, transactionId: string): Promise<Transaction> {
    const transaction =
      await this.transactionRepository.findMobileTopupByIdForUser(
        userId,
        transactionId,
      );
    if (!transaction) {
      throw new NotFoundException('Topup transaction not found');
    }
    return transaction;
  }

  async getByExternalId(
    userId: string,
    externalId: string,
  ): Promise<Transaction> {
    const transaction =
      await this.transactionRepository.findMobileTopupByExternalIdForUser(
        userId,
        externalId,
      );
    if (!transaction) {
      throw new NotFoundException('Topup transaction not found');
    }
    return transaction;
  }
}
