import { Module } from '@nestjs/common';
import { SigninController } from './signin.controller';
import { SigninService } from './signin.service';
import { SigninHandler } from './signin.handler';
import { UsersSharedModule } from '../_shared/users-shared.module';

@Module({
  imports: [UsersSharedModule],
  controllers: [SigninController],
  providers: [SigninHandler, SigninService],
})
export class SigninModule {}
