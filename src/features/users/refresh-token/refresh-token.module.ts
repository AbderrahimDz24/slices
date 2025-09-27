import { Module } from '@nestjs/common';
import { RefreshTokenController } from './refresh-token.controller';
import { RefreshTokenService } from './refresh-token.service';
import { RefreshTokenHandler } from './refresh-token.handler';
import { UsersSharedModule } from '../_shared/users-shared.module';

@Module({
  imports: [UsersSharedModule],
  controllers: [RefreshTokenController],
  providers: [RefreshTokenHandler, RefreshTokenService],
})
export class RefreshTokenModule {}
