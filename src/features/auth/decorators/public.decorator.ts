import { AuthType } from '@auth/enums';
import { Auth } from './auth.decorator';

export const Public = () => Auth(AuthType.None);
