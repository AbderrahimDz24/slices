import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Offer, Product } from '@products/models';
import { User } from '@users/models';
import { integerAmountTransformer } from '@wallets/models';
import { generateTransactionId } from '@transactions/utils';
import type { TransactionInputs } from './mobile-topup-transaction-inputs';
import { TransactionStatus } from './transaction-status.enum';

@Entity('transactions')
@Index('IDX_transactions_user_external_id', ['userId', 'externalId'], {
  unique: true,
  where: '"external_id" IS NOT NULL',
})
export class Transaction {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  id: string;

  @Column({ name: 'user_id', type: 'varchar', length: 20 })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'offer_id', type: 'varchar', length: 20 })
  offerId: string;

  @ManyToOne(() => Offer, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'offer_id' })
  offer: Offer;

  @Column({ name: 'product_id', type: 'varchar', length: 20 })
  productId: string;

  @ManyToOne(() => Product, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'product_code', type: 'text' })
  productCode: string;

  @Column({ type: 'varchar', length: 32 })
  status: TransactionStatus;

  @Column({
    type: 'numeric',
    precision: 18,
    scale: 0,
    transformer: integerAmountTransformer,
  })
  amount: number;

  @Column({ type: 'varchar', length: 3, default: 'DZD' })
  currency: string;

  @Column({ name: 'external_id', type: 'varchar', length: 128, nullable: true })
  externalId: string | null;

  @Column({ type: 'jsonb' })
  inputs: TransactionInputs;

  @Column({ name: 'failure_reason', type: 'text', nullable: true })
  failureReason: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @BeforeInsert()
  assignId() {
    if (!this.id) {
      this.id = generateTransactionId();
    }
  }
}
