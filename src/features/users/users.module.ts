import { Module } from '@nestjs/common';
import { UsersCoreModule } from './core';
import { CreateAdminUserModule } from './slices/create-admin-user/create-admin-user.module';

@Module({
  imports: [UsersCoreModule, CreateAdminUserModule],
  exports: [UsersCoreModule],
})
export class UsersModule {}
