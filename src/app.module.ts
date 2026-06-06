import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import databaseConfig, { DatabaseConfig } from './config/database.config';
import clientAccountRateLimitConfig, {
  ClientAccountRateLimitRuntimeConfig,
} from './config/client-account-rate-limit.config';
import { CoreModule } from '@core/core.module';
import { UsersModule } from '@users/users.module';
import { AuthModule } from '@auth/auth.module';
import { ApiKeysModule } from '@api-keys/api-keys.module';
import { ProductsModule } from '@products/products.module';
import { WalletsModule } from '@wallets/wallets.module';
import { TransactionsModule } from '@transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      useFactory: (config: DatabaseConfig) => config.toTypeOrmOptions(),
      inject: [databaseConfig.KEY],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule.forFeature(clientAccountRateLimitConfig)],
      useFactory: (config: ClientAccountRateLimitRuntimeConfig) => ({
        throttlers: [
          {
            name: 'clientAccount',
            limit: config.limit,
            ttl: config.ttlMs,
            blockDuration: config.ttlMs,
          },
        ],
        storage: new ThrottlerStorageRedisService({
          host: config.redisHost,
          port: config.redisPort,
          connectTimeout: 1000,
          maxRetriesPerRequest: 1,
        }),
      }),
      inject: [clientAccountRateLimitConfig.KEY],
    }),
    CoreModule,
    WalletsModule,
    ProductsModule,
    TransactionsModule,
    UsersModule,
    ApiKeysModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
