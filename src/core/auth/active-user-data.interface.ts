import { UserRoles } from './user-roles.enum';

export interface ActiveUserData {
  sub: number;
  email: string;
  role: UserRoles;
}
