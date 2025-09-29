import { Module } from '@nestjs/common';
import { ProductsModule } from './features/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { UsersModule } from './features/users/users.module';
import databaseConfig, { DatabaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CoreModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      useFactory: (config: DatabaseConfig) => config.toTypeOrmOptions(),
      inject: [databaseConfig.KEY],
    }),
    ProductsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
