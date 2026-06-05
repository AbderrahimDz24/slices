import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { generateProductId } from '@products/utils';
import { Offer } from './offer.entity';
import { ProductType } from './product-type.enum';

@Entity('products')
export class Product {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  id: string;

  @Column({ type: 'text', unique: true })
  code: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'varchar', length: 64 })
  type: ProductType;

  @OneToMany(() => Offer, (offer) => offer.product)
  offers?: Offer[];

  @BeforeInsert()
  assignId() {
    if (!this.id) {
      this.id = generateProductId();
    }
  }
}
