import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeysCoreModule } from '@api-keys/core';
import { AuthenticationGuard, JwtAuthGuard, RolesGuard } from './guards';
import { RefreshTokenModule } from './slices/refresh-token/refresh-token.module';
import { SigninModule } from './slices/signin/signin.module';

@Module({
  imports: [SigninModule, RefreshTokenModule, ApiKeysCoreModule],
  providers: [
    JwtAuthGuard,
    { provide: APP_GUARD, useClass: AuthenticationGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  exports: [],
})
export class AuthModule {}
