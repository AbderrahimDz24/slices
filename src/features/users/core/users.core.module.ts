import { Module } from '@nestjs/common';
import { WalletsCoreModule } from '@wallets/core';
import { UserRepository } from '@users/repositories';
import { BootstrapAdminService, CreateUserService } from '@users/services';

@Module({
  imports: [WalletsCoreModule],
  providers: [UserRepository, BootstrapAdminService, CreateUserService],
  exports: [UserRepository, BootstrapAdminService, CreateUserService],
})
export class UsersCoreModule {}
