import { Module } from '@nestjs/common';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { SignupRepository } from './signup.repository';
import { SignupHandler } from './signup.handler';
import { AuthCoreModule } from '@auth/core/auth-core.module';

@Module({
  imports: [AuthCoreModule],
  controllers: [SignupController],
  providers: [SignupHandler, SignupService, SignupRepository],
})
export class SignupModule {}
