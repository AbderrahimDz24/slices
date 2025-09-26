import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoles } from '../../../core/auth/user-roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', default: UserRoles.USER })
  role: UserRoles;
}
