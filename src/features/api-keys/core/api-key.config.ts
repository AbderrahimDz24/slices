import { registerAs } from '@nestjs/config';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { validateConfig } from '@common/utils';
import { ApiKeyMode } from '@api-keys/models';

export interface ApiKeyRuntimeConfig {
  mode: ApiKeyMode;
}

export class ApiKeyConfig {
  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(ApiKeyMode))
  API_KEY_MODE: ApiKeyMode;

  toRuntimeConfig(): ApiKeyRuntimeConfig {
    return {
      mode: this.API_KEY_MODE,
    };
  }
}

export default registerAs('apiKey', () => {
  return validateConfig(process.env, ApiKeyConfig).toRuntimeConfig();
});
