import { Global, Module } from '@nestjs/common';
import { CqrsCustomModule } from './cqrs/cqrs-custom.module';
import { HashingModule } from './hashing/hashing.module';

@Global()
@Module({
  imports: [CqrsCustomModule, HashingModule],
  providers: [],
  exports: [CqrsCustomModule, HashingModule],
})
export class CoreModule {}
