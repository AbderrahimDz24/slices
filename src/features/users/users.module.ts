import { Module } from '@nestjs/common';
import { UsersCoreModule } from './core';
import { CreateUserModule } from './slices/create-user/create-user.module';

@Module({
  imports: [UsersCoreModule, CreateUserModule],
  exports: [UsersCoreModule],
})
export class UsersModule {}
