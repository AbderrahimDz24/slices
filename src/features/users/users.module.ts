import { Module } from '@nestjs/common';
import { UserRepository } from './repositores';

@Module({
  imports: [],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UsersModule {}
