import { ConflictException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserRoles } from '@common/enums';
import { HashingService } from '@core/hashing';
import { User } from '@users/models';
import { UserRepository } from '@users/repositories';

@Injectable()
export class BootstrapAdminService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly hashing: HashingService,
    private readonly userRepository: UserRepository,
  ) {}

  async bootstrapAdmin(email: string, password: string): Promise<User> {
    const passwordHash = await this.hashing.hash(password);

    return this.dataSource.transaction(async (manager) => {
      await manager.query('SELECT pg_advisory_xact_lock($1)', [811611221]);

      const adminExists = await this.userRepository.existsByRole(
        UserRoles.ADMIN,
        manager,
      );
      if (adminExists) {
        throw new ConflictException('An ADMIN user already exists');
      }

      const existingUser = await this.userRepository.findByEmail(
        email,
        manager,
      );
      if (existingUser) {
        throw new ConflictException('Email already in use');
      }

      return this.userRepository.createUser(
        email,
        passwordHash,
        UserRoles.ADMIN,
        manager,
      );
    });
  }
}
