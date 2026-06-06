import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from '@users/models';
import { generateWalletLedgerEntryId } from '@wallets/utils';
import { integerAmountTransformer } from './amount.transformer';
import { Wallet } from './wallet.entity';
import { WalletLedgerEntryType } from './wallet-ledger-entry-type.enum';

@Entity('wallet_ledger_entries')
export class WalletLedgerEntry {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  id: string;

  @Column({ name: 'wallet_id', type: 'varchar', length: 20 })
  walletId: string;

  @ManyToOne(() => Wallet, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'wallet_id' })
  wallet: Wallet;

  @Column({ name: 'user_id', type: 'varchar', length: 20 })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    name: 'transaction_id',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  transactionId: string | null;

  @Column({ type: 'varchar', length: 32 })
  type: WalletLedgerEntryType;

  @Column({
    type: 'numeric',
    precision: 18,
    scale: 0,
    transformer: integerAmountTransformer,
  })
  amount: number;

  @Column({ type: 'varchar', length: 3, default: 'DZD' })
  currency: string;

  @Column({
    name: 'available_balance_delta',
    type: 'numeric',
    precision: 18,
    scale: 0,
    transformer: integerAmountTransformer,
  })
  availableBalanceDelta: number;

  @Column({
    name: 'reserved_balance_delta',
    type: 'numeric',
    precision: 18,
    scale: 0,
    transformer: integerAmountTransformer,
  })
  reservedBalanceDelta: number;

  @Column({
    name: 'available_balance_after',
    type: 'numeric',
    precision: 18,
    scale: 0,
    transformer: integerAmountTransformer,
  })
  availableBalanceAfter: number;

  @Column({
    name: 'reserved_balance_after',
    type: 'numeric',
    precision: 18,
    scale: 0,
    transformer: integerAmountTransformer,
  })
  reservedBalanceAfter: number;

  @Column({
    name: 'actor_user_id',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  actorUserId: string | null;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'actor_user_id' })
  actorUser: User | null;

  @Column({ type: 'text', nullable: true })
  note: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @BeforeInsert()
  assignId() {
    if (!this.id) {
      this.id = generateWalletLedgerEntryId();
    }
  }
}
