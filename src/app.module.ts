import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import databaseConfig, { DatabaseConfig } from './config/database.config';
import { CoreModule } from '@core/core.module';
import { UsersModule } from '@users/users.module';
import { AuthModule } from '@auth/auth.module';
import { ProductsModule } from '@products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      useFactory: (config: DatabaseConfig) => config.toTypeOrmOptions(),
      inject: [databaseConfig.KEY],
    }),
    CoreModule,
    ProductsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
