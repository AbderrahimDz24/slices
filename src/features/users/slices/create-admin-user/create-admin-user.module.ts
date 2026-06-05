import { Module } from '@nestjs/common';
import { UsersCoreModule } from '@users/core';
import { CreateAdminUserController } from './create-admin-user.controller';
import { CreateAdminUserHandler } from './create-admin-user.handler';

@Module({
  imports: [UsersCoreModule],
  controllers: [CreateAdminUserController],
  providers: [CreateAdminUserHandler],
})
export class CreateAdminUserModule {}
