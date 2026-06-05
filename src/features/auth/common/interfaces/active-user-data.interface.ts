import { UserRoles } from '@common/enums';
import { AuthType } from '@auth/enums';

export interface ActiveUserData {
  sub: string;
  email: string;
  role: UserRoles;
  authType?: AuthType;
  apiKeyId?: string;
}
