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
import { User } from '@users/models';
import { generateApiKeyId } from '@api-keys/utils';
import { ApiKeyMode } from './api-key-mode.enum';

@Index('IDX_api_keys_user_id_active', ['userId'], {
  where: '"revoked_at" IS NULL',
})
@Entity('api_keys')
export class ApiKey {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  id: string;

  @Column({ name: 'user_id', type: 'varchar', length: 20 })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'text' })
  name: string;

  @Column({ name: 'key_preview', type: 'varchar', length: 36 })
  keyPreview: string;

  @Column({ name: 'secret_hash', type: 'char', length: 64 })
  secretHash: string;

  @Column({ type: 'varchar', length: 8 })
  mode: ApiKeyMode;

  @Column({ name: 'last_used_at', type: 'timestamptz', nullable: true })
  lastUsedAt: Date | null;

  @Column({ name: 'revoked_at', type: 'timestamptz', nullable: true })
  revokedAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @BeforeInsert()
  assignId() {
    if (!this.id) {
      this.id = generateApiKeyId();
    }
  }
}
