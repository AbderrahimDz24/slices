import { Column, Entity, PrimaryColumn } from 'typeorm';
import { UserRoles } from '@common/enums';

@Entity('users')
export class User {
  @PrimaryColumn({ type: 'uuid', default: () => 'uuidv4()' })
  id: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'enum', enumName: 'role', default: UserRoles.REGULAR })
  role: UserRoles;
}
