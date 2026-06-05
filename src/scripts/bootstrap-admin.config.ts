import 'reflect-metadata';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { validateConfig } from '@common/utils';

class BootstrapAdminConfig {
  @IsEmail()
  @IsNotEmpty()
  BOOTSTRAP_ADMIN_EMAIL: string;

  @IsString()
  @MinLength(10)
  BOOTSTRAP_ADMIN_PASSWORD: string;
}

export interface BootstrapAdminCredentials {
  email: string;
  password: string;
}

export function loadBootstrapAdminCredentials(
  env: Record<string, unknown> = process.env,
): BootstrapAdminCredentials {
  const config = validateConfig(env, BootstrapAdminConfig);
  return {
    email: config.BOOTSTRAP_ADMIN_EMAIL,
    password: config.BOOTSTRAP_ADMIN_PASSWORD,
  };
}
