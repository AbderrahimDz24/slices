import { Module } from '@nestjs/common';
import { ApiKeysCoreModule } from './core';
import { CreateApiKeyModule } from './slices/create-api-key/create-api-key.module';
import { ListApiKeysModule } from './slices/list-api-keys/list-api-keys.module';
import { RevokeApiKeyModule } from './slices/revoke-api-key/revoke-api-key.module';

@Module({
  imports: [
    ApiKeysCoreModule,
    CreateApiKeyModule,
    ListApiKeysModule,
    RevokeApiKeyModule,
  ],
  exports: [ApiKeysCoreModule],
})
export class ApiKeysModule {}
