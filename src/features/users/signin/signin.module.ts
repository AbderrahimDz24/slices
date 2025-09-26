import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../_shared/user.entity';
import { SigninController } from './signin.controller';
import { SigninService } from './signin.service';
import { SigninRepository } from './signin.repository';
import { SigninHandler } from './signin.handler';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [SigninController],
  providers: [SigninHandler, SigninService, SigninRepository],
})
export class SigninModule {}
