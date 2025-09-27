import { Module } from '@nestjs/common';
import { SignupModule } from './signup/signup.module';
import { SigninModule } from './signin/signin.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';

@Module({
  imports: [SignupModule, SigninModule, RefreshTokenModule],
})
export class UsersModule {}
