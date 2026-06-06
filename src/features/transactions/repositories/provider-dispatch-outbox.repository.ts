import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import {
  ProviderDispatchOutbox,
  ProviderDispatchOutboxStatus,
} from '@transactions/models';

export interface CreateProviderDispatchOutboxRecord {
  transactionId: string;
  queueName: string;
  jobName: string;
  payload: ProviderDispatchOutbox['payload'];
}

@Injectable()
export class ProviderDispatchOutboxRepository extends Repository<ProviderDispatchOutbox> {
  constructor(private readonly dataSource: DataSource) {
    super(ProviderDispatchOutbox, dataSource.createEntityManager());
  }

  async createEntry(
    input: CreateProviderDispatchOutboxRecord,
    manager?: EntityManager,
  ): Promise<ProviderDispatchOutbox> {
    const repository = manager?.getRepository(ProviderDispatchOutbox) ?? this;
    const entry = repository.create({
      ...input,
      status: ProviderDispatchOutboxStatus.Pending,
      attempts: 0,
      lastError: null,
      enqueuedAt: null,
    });
    await repository.save(entry);
    return entry;
  }

  findById(id: string): Promise<ProviderDispatchOutbox | null> {
    return this.findOne({ where: { id } });
  }

  async markEnqueued(id: string): Promise<void> {
    await this.update(id, {
      status: ProviderDispatchOutboxStatus.Enqueued,
      lastError: null,
      enqueuedAt: new Date(),
    });
  }

  async recordFailure(id: string, error: string): Promise<void> {
    await this.createQueryBuilder()
      .update(ProviderDispatchOutbox)
      .set({
        attempts: () => '"attempts" + 1',
        lastError: error,
      })
      .where('id = :id', { id })
      .execute();
  }
}
