import { ConflictException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserRoles } from '@common/enums';
import { HashingService } from '@core/hashing';
import { WalletService } from '@wallets/services';
import { User } from '@users/models';
import { UserRepository } from '@users/repositories';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly hashing: HashingService,
    private readonly userRepository: UserRepository,
    private readonly walletService: WalletService,
  ) {}

  async createUser(
    email: string,
    password: string,
    role: UserRoles,
  ): Promise<User> {
    const passwordHash = await this.hashing.hash(password);

    return this.dataSource.transaction(async (manager) => {
      const existing = await this.userRepository.findByEmail(email, manager);
      if (existing) {
        throw new ConflictException('Email already in use');
      }

      const user = await this.userRepository.createUser(
        email,
        passwordHash,
        role,
        manager,
      );
      await this.walletService.createWalletForUser(user.id, manager);
      return user;
    });
  }
}
