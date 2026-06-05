import { Module } from '@nestjs/common';
import { ApiKeysCoreModule } from '@api-keys/core';
import { RevokeApiKeyController } from './revoke-api-key.controller';
import { RevokeApiKeyHandler } from './revoke-api-key.handler';

@Module({
  imports: [ApiKeysCoreModule],
  controllers: [RevokeApiKeyController],
  providers: [RevokeApiKeyHandler],
})
export class RevokeApiKeyModule {}
