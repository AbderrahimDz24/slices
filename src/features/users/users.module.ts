import { Module } from '@nestjs/common';
import { UsersCoreModule } from './core';

@Module({
  imports: [UsersCoreModule],
  exports: [UsersCoreModule],
})
export class UsersModule {}
