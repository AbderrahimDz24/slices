import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { validateConfig } from '@common/utils/validate-config';

export class DatabaseConfig {
  @IsString()
  @IsNotEmpty()
  PG_HOST: string;

  @Type(() => Number)
  @IsNumber()
  PG_PORT: number;

  @IsString()
  @IsNotEmpty()
  PG_USER: string;

  @IsString()
  @IsNotEmpty()
  PG_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  PG_DB: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['true', 'false'])
  TYPEORM_SYNCHRONIZE: string = 'false';

  constructor() {}

  public toTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.PG_HOST,
      port: this.PG_PORT,
      username: this.PG_USER,
      password: this.PG_PASSWORD,
      database: this.PG_DB,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: this.TYPEORM_SYNCHRONIZE === 'true',
      logging: false,
    };
  }
}

export default registerAs('database', (): DatabaseConfig => {
  return validateConfig(process.env, DatabaseConfig);
});
