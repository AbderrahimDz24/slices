import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsString } from 'class-validator';
import { validateConfig } from '../utils/validate-config';

export class JwtConfig {
  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_TOKEN_AUDIENCE: string;

  @IsString()
  @IsNotEmpty()
  JWT_TOKEN_ISSUER: string;

  @IsString()
  @IsNotEmpty()
  JWT_ACCESS_TOKEN_TTL: string;

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_TOKEN_TTL: string;

  constructor() {}

  toJwtOptions() {
    return {
      secret: this.JWT_SECRET,
      accessTokenTtl: this.JWT_ACCESS_TOKEN_TTL,
      refreshTokenTtl: this.JWT_REFRESH_TOKEN_TTL,
      signOptions: {
        audience: this.JWT_TOKEN_AUDIENCE,
        issuer: this.JWT_TOKEN_ISSUER,
      },
    };
  }
}

export default registerAs('jwt', () => {
  return validateConfig(process.env, JwtConfig).toJwtOptions();
});
