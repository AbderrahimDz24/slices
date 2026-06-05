import { Module } from '@nestjs/common';
import { ApiKeysCoreModule } from '@api-keys/core';
import { ListApiKeysController } from './list-api-keys.controller';
import { ListApiKeysHandler } from './list-api-keys.handler';

@Module({
  imports: [ApiKeysCoreModule],
  controllers: [ListApiKeysController],
  providers: [ListApiKeysHandler],
})
export class ListApiKeysModule {}
