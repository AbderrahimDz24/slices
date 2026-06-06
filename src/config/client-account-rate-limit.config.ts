import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { registerAs } from '@nestjs/config';
import { validateConfig } from '@common/utils';

export interface ClientAccountRateLimitRuntimeConfig {
  redisHost: string;
  redisPort: number;
  limit: number;
  ttlMs: number;
}

export class ClientAccountRateLimitConfig {
  @IsString()
  @IsNotEmpty()
  REDIS_HOST = 'localhost';

  @Type(() => Number)
  @IsInt()
  @Min(1)
  REDIS_PORT = 6379;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  CLIENT_ACCOUNT_RATE_LIMIT_LIMIT = 60;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  CLIENT_ACCOUNT_RATE_LIMIT_TTL_MS = 60000;

  toRuntimeConfig(): ClientAccountRateLimitRuntimeConfig {
    return {
      redisHost: this.REDIS_HOST,
      redisPort: this.REDIS_PORT,
      limit: this.CLIENT_ACCOUNT_RATE_LIMIT_LIMIT,
      ttlMs: this.CLIENT_ACCOUNT_RATE_LIMIT_TTL_MS,
    };
  }
}

export default registerAs('clientAccountRateLimit', () => {
  return validateConfig(
    process.env,
    ClientAccountRateLimitConfig,
  ).toRuntimeConfig();
});
