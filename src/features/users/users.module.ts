import { Module } from '@nestjs/common';
import { SignupModule } from './signup/signup.module';
import { SigninModule } from './signin/signin.module';

@Module({
  imports: [SignupModule, SigninModule],
})
export class UsersModule {}
