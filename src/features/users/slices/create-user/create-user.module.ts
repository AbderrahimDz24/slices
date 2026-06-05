import { Module } from '@nestjs/common';
import { UsersCoreModule } from '@users/core';
import { CreateUserController } from './create-user.controller';
import { CreateUserHandler } from './create-user.handler';

@Module({
  imports: [UsersCoreModule],
  controllers: [CreateUserController],
  providers: [CreateUserHandler],
})
export class CreateUserModule {}
