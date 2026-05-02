import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { UserRoles } from '@common/enums';
import { generateUserId } from '@users/utils';

@Entity('users')
export class User {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  id: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    enumName: 'role',
    default: UserRoles.REGULAR,
  })
  role: UserRoles;

  @BeforeInsert()
  assignId() {
    if (!this.id) {
      this.id = generateUserId();
    }
  }
}
