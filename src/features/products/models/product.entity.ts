import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { generateProductId } from '@products/utils';

@Entity('products')
export class Product {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  id: string;

  @Column({ type: 'text', unique: true })
  name: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  category: string;

  @Column({ type: 'text', nullable: true })
  image: string;

  @BeforeInsert()
  assignId() {
    if (!this.id) {
      this.id = generateProductId();
    }
  }
}
