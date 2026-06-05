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
import { User } from '@users/models';
import { generateWalletId } from '@wallets/utils';
import { integerAmountTransformer } from './amount.transformer';

@Entity('wallets')
export class Wallet {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  id: string;

  @Column({ name: 'user_id', type: 'varchar', length: 20 })
  userId: string;

  @OneToOne(() => User, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 3, default: 'DZD' })
  currency: string;

  @Column({
    name: 'available_balance',
    type: 'numeric',
    precision: 18,
    scale: 0,
    default: 0,
    transformer: integerAmountTransformer,
  })
  availableBalance: number;

  @Column({
    name: 'reserved_balance',
    type: 'numeric',
    precision: 18,
    scale: 0,
    default: 0,
    transformer: integerAmountTransformer,
  })
  reservedBalance: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @BeforeInsert()
  assignId() {
    if (!this.id) {
      this.id = generateWalletId();
    }
  }
}
