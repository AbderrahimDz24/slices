import { Global, Module } from '@nestjs/common';
import { UsersModule } from '@users/users.module';
import { AuthService } from './services';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './services/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    UsersModule,
  ],
  providers: [AuthService],
  exports: [UsersModule, JwtModule, AuthService],
})
export class AuthCoreModule {}
