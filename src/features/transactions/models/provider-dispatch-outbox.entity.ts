import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { generateProviderDispatchOutboxId } from '@transactions/utils';
import { ProviderDispatchOutboxStatus } from './provider-dispatch-outbox-status.enum';
import { Transaction } from './transaction.entity';

export interface ProviderDispatchPayload {
  transactionId: string;
}

@Entity('provider_dispatch_outbox')
export class ProviderDispatchOutbox {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  id: string;

  @Column({ name: 'transaction_id', type: 'varchar', length: 20 })
  transactionId: string;

  @OneToOne(() => Transaction, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'transaction_id' })
  transaction: Transaction;

  @Column({
    type: 'varchar',
    length: 32,
    default: ProviderDispatchOutboxStatus.Pending,
  })
  status: ProviderDispatchOutboxStatus;

  @Column({ name: 'queue_name', type: 'varchar', length: 64 })
  queueName: string;

  @Column({ name: 'job_name', type: 'varchar', length: 64 })
  jobName: string;

  @Column({ type: 'jsonb' })
  payload: ProviderDispatchPayload;

  @Column({ type: 'integer', default: 0 })
  attempts: number;

  @Column({ name: 'last_error', type: 'text', nullable: true })
  lastError: string | null;

  @Column({ name: 'enqueued_at', type: 'timestamptz', nullable: true })
  enqueuedAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @BeforeInsert()
  assignId() {
    if (!this.id) {
      this.id = generateProviderDispatchOutboxId();
    }
  }
}
