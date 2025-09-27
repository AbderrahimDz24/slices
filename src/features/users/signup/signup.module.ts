import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../_shared/user.entity';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { SignupRepository } from './signup.repository';
import { SignupHandler } from './signup.handler';
import { UsersSharedModule } from '../_shared/users-shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersSharedModule],
  controllers: [SignupController],
  providers: [SignupHandler, SignupService, SignupRepository],
})
export class SignupModule {}
