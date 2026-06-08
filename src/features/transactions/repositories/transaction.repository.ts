import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { ProductType } from '@products/models';
import { Transaction } from '@transactions/models';

export interface CreateTransactionRecord {
  id: string;
  userId: string;
  offerId: string;
  productId: string;
  productCode: string;
  status: Transaction['status'];
  amount: number;
  currency: string;
  externalId: string | null;
  inputs: Transaction['inputs'];
  failureReason: string | null;
}

@Injectable()
export class TransactionRepository extends Repository<Transaction> {
  constructor(private readonly dataSource: DataSource) {
    super(Transaction, dataSource.createEntityManager());
  }

  async createTransaction(
    input: CreateTransactionRecord,
    manager?: EntityManager,
  ): Promise<Transaction> {
    const repository = manager?.getRepository(Transaction) ?? this;
    const transaction = repository.create(input);
    await repository.save(transaction);
    return transaction;
  }

  existsByExternalId(
    userId: string,
    externalId: string,
    manager?: EntityManager,
  ): Promise<boolean> {
    const repository = manager?.getRepository(Transaction) ?? this;
    return repository.exists({ where: { userId, externalId } });
  }

  findMobileTopupByIdForUser(
    userId: string,
    transactionId: string,
  ): Promise<Transaction | null> {
    return this.createQueryBuilder('transaction')
      .innerJoin('transaction.product', 'product')
      .where('transaction.userId = :userId', { userId })
      .andWhere('transaction.id = :transactionId', { transactionId })
      .andWhere('product.type = :productType', {
        productType: ProductType.MobileTopup,
      })
      .getOne();
  }

  findMobileTopupByExternalIdForUser(
    userId: string,
    externalId: string,
  ): Promise<Transaction | null> {
    return this.createQueryBuilder('transaction')
      .innerJoin('transaction.product', 'product')
      .where('transaction.userId = :userId', { userId })
      .andWhere('transaction.externalId = :externalId', { externalId })
      .andWhere('product.type = :productType', {
        productType: ProductType.MobileTopup,
      })
      .getOne();
  }
}
