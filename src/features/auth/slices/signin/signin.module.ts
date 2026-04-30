import { Module } from '@nestjs/common';
import { AuthCoreModule } from '@auth/core';
import { SigninController } from './signin.controller';
import { SigninHandler } from './signin.handler';

@Module({
  imports: [AuthCoreModule],
  controllers: [SigninController],
  providers: [SigninHandler],
})
export class SigninModule {}
