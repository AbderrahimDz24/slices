import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard, RolesGuard } from './guards';
import { RefreshTokenModule } from './slices/refresh-token/refresh-token.module';
import { SigninModule } from './slices/signin/signin.module';
import { SignupModule } from './slices/signup/signup.module';

@Module({
  imports: [SignupModule, SigninModule, RefreshTokenModule],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  exports: [],
})
export class AuthModule {}
