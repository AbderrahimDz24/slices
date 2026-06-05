import { Module } from '@nestjs/common';
import { ApiKeysCoreModule } from '@api-keys/core';
import { CreateApiKeyController } from './create-api-key.controller';
import { CreateApiKeyHandler } from './create-api-key.handler';

@Module({
  imports: [ApiKeysCoreModule],
  controllers: [CreateApiKeyController],
  providers: [CreateApiKeyHandler],
})
export class CreateApiKeyModule {}
