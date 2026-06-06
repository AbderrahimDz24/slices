import { Global, Module } from '@nestjs/common';
import { ClientAccountRateLimitGuard } from './client-account-rate-limit.guard';

@Global()
@Module({
  providers: [ClientAccountRateLimitGuard],
  exports: [ClientAccountRateLimitGuard],
})
export class RateLimitingModule {}
