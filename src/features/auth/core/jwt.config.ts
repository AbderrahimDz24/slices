import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsString } from 'class-validator';
import ms, { type StringValue } from 'ms';
import { validateConfig } from '@common/utils';

type JwtDuration = StringValue;

export interface JwtRuntimeConfig {
  secret: string;
  accessTokenTtl: JwtDuration;
  refreshTokenTtl: JwtDuration;
  signOptions: {
    audience: string;
    issuer: string;
  };
}

function parseDuration(value: string, key: string): JwtDuration {
  const duration = value as JwtDuration;

  if (ms(duration) === undefined) {
    throw new Error(`${key} must be a valid ms-style duration string`);
  }

  return duration;
}

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

  toJwtOptions(): JwtRuntimeConfig {
    return {
      secret: this.JWT_SECRET,
      accessTokenTtl: parseDuration(
        this.JWT_ACCESS_TOKEN_TTL,
        'JWT_ACCESS_TOKEN_TTL',
      ),
      refreshTokenTtl: parseDuration(
        this.JWT_REFRESH_TOKEN_TTL,
        'JWT_REFRESH_TOKEN_TTL',
      ),
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
