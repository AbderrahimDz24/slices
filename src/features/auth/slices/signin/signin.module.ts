import { Module } from '@nestjs/common';
import { SigninController } from './signin.controller';
import { SigninService } from './signin.service';
import { SigninHandler } from './signin.handler';
import { AuthCoreModule } from '@auth/core/auth-core.module';

@Module({
  imports: [AuthCoreModule],
  controllers: [SigninController],
  providers: [SigninHandler, SigninService],
})
export class SigninModule {}
