import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersCoreModule } from '@users/core';
import { SignupRepository } from '@auth/repositories';
import {
  AuthService,
  RefreshTokenService,
  SigninService,
  SignupService,
} from '@auth/services';
import jwtConfig from './jwt.config';

const providers = [
  AuthService,
  SigninService,
  SignupService,
  RefreshTokenService,
  SignupRepository,
];

@Global()
@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    UsersCoreModule,
  ],
  providers,
  exports: [UsersCoreModule, JwtModule, ...providers],
})
export class AuthCoreModule {}
