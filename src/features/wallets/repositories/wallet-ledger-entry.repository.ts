import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { WalletLedgerEntry } from '@wallets/models';

@Injectable()
export class WalletLedgerEntryRepository extends Repository<WalletLedgerEntry> {
  constructor(private readonly dataSource: DataSource) {
    super(WalletLedgerEntry, dataSource.createEntityManager());
  }

  async createEntry(
    input: Partial<WalletLedgerEntry>,
    manager?: EntityManager,
  ): Promise<WalletLedgerEntry> {
    const repository = manager?.getRepository(WalletLedgerEntry) ?? this;
    const entry = repository.create(input);
    await repository.save(entry);
    return entry;
  }
}
