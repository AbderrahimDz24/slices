import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { generateOfferId } from '@products/utils';
import type { OfferInputSchema } from './offer-input-schema';
import { OfferStatus } from './offer-status.enum';
import { Product } from './product.entity';

@Entity('offers')
@Index('IDX_76fc1c60c16b4f4c52a72c9392', ['productId', 'code'], {
  unique: true,
})
export class Offer {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  id: string;

  @Column({ name: 'product_id', type: 'varchar', length: 20 })
  productId: string;

  @ManyToOne(() => Product, (product) => product.offers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'text' })
  code: string;

  @Column({ type: 'varchar', length: 32 })
  status: OfferStatus;

  @Column({ name: 'input_schema', type: 'jsonb' })
  inputSchema: OfferInputSchema;

  @BeforeInsert()
  assignId() {
    if (!this.id) {
      this.id = generateOfferId();
    }
  }
}
