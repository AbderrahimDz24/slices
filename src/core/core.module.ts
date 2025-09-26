import { Global, Module } from '@nestjs/common';
import { CqrsCustomModule } from './cqrs/cqrs-custom.module';
import { HashingModule } from './hashing/hashing.module';
import { AuthModule } from './auth/auth.module';

@Global()
@Module({
  imports: [CqrsCustomModule, HashingModule, AuthModule],
  providers: [],
  exports: [CqrsCustomModule, HashingModule, AuthModule],
})
export class CoreModule {}
