import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Wallet } from '@wallets/models';

@Injectable()
export class WalletRepository extends Repository<Wallet> {
  constructor(private readonly dataSource: DataSource) {
    super(Wallet, dataSource.createEntityManager());
  }

  async createForUser(
    userId: string,
    manager?: EntityManager,
  ): Promise<Wallet> {
    const repository = manager?.getRepository(Wallet) ?? this;
    const wallet = repository.create({
      userId,
      currency: 'DZD',
      availableBalance: 0,
      reservedBalance: 0,
    });
    await repository.save(wallet);
    return wallet;
  }

  findByUserId(
    userId: string,
    manager?: EntityManager,
  ): Promise<Wallet | null> {
    const repository = manager?.getRepository(Wallet) ?? this;
    return repository.findOne({ where: { userId } });
  }

  findByUserIdForUpdate(
    userId: string,
    manager: EntityManager,
  ): Promise<Wallet | null> {
    return manager.getRepository(Wallet).findOne({
      where: { userId },
      lock: { mode: 'pessimistic_write' },
    });
  }
}
