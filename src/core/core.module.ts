import { Global, Module } from '@nestjs/common';
import { CqrsCustomModule } from './cqrs/cqrs-custom.module';
import { HashingModule } from './hashing/hashing.module';
import { RateLimitingModule } from './rate-limiting';

@Global()
@Module({
  imports: [CqrsCustomModule, HashingModule, RateLimitingModule],
  providers: [],
  exports: [CqrsCustomModule, HashingModule, RateLimitingModule],
})
export class CoreModule {}
