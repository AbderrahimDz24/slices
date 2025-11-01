import { UserRoles } from '@common/enums';

export interface ActiveUserData {
  sub: string;
  email: string;
  role: UserRoles;
}
