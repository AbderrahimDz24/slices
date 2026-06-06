import { SetMetadata } from '@nestjs/common';
import { CLIENT_ACCOUNT_RATE_LIMIT_KEY } from '@core/rate-limiting';

export const ClientAccountRateLimit = () =>
  SetMetadata(CLIENT_ACCOUNT_RATE_LIMIT_KEY, true);
