import { Module } from '@nestjs/common';
import { RefreshTokenController } from './refresh-token.controller';
import { RefreshTokenService } from './refresh-token.service';
import { RefreshTokenHandler } from './refresh-token.handler';
import { AuthCoreModule } from '@auth/core/auth-core.module';

@Module({
  imports: [AuthCoreModule],
  controllers: [RefreshTokenController],
  providers: [RefreshTokenHandler, RefreshTokenService],
})
export class RefreshTokenModule {}
