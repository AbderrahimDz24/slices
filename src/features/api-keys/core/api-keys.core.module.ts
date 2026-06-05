import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import apiKeyConfig from './api-key.config';
import { ApiKeyAuthGuard } from '@api-keys/guards';
import { ApiKeyRepository } from '@api-keys/repositories';
import { ApiKeysService } from '@api-keys/services';

@Module({
  imports: [ConfigModule.forFeature(apiKeyConfig)],
  providers: [ApiKeyRepository, ApiKeysService, ApiKeyAuthGuard],
  exports: [ApiKeyRepository, ApiKeysService, ApiKeyAuthGuard],
})
export class ApiKeysCoreModule {}
