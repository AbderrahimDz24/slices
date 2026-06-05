import { Module } from '@nestjs/common';
import { WalletsCoreModule } from '@wallets/core';
import { UserRepository } from '@users/repositories';
import { CreateUserService } from '@users/services';

@Module({
  imports: [WalletsCoreModule],
  providers: [UserRepository, CreateUserService],
  exports: [UserRepository, CreateUserService],
})
export class UsersCoreModule {}
