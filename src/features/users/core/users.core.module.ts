import { Module } from '@nestjs/common';
import { UserRepository } from '@users/repositories';

@Module({
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UsersCoreModule {}
