import { Module } from '@nestjs/common';
import { AuthCoreModule } from '@auth/core';
import { RefreshTokenController } from './refresh-token.controller';
import { RefreshTokenHandler } from './refresh-token.handler';

@Module({
  imports: [AuthCoreModule],
  controllers: [RefreshTokenController],
  providers: [RefreshTokenHandler],
})
export class RefreshTokenModule {}
