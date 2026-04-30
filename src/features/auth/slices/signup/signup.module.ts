import { Module } from '@nestjs/common';
import { AuthCoreModule } from '@auth/core';
import { SignupController } from './signup.controller';
import { SignupHandler } from './signup.handler';

@Module({
  imports: [AuthCoreModule],
  controllers: [SignupController],
  providers: [SignupHandler],
})
export class SignupModule {}
