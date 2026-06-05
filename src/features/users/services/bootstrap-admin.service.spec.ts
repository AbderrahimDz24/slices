import { ConflictException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { UserRoles } from '@common/enums';
import { HashingService } from '@core/hashing';
import { User } from '@users/models';
import { UserRepository } from '@users/repositories';
import { BootstrapAdminService } from './bootstrap-admin.service';

describe('BootstrapAdminService', () => {
  const email = 'admin@example.com';
  const password = 'strongPassword123';
  const passwordHash = 'hashed-password';

  function setup(options?: {
    adminExists?: boolean;
    existingUser?: User | null;
  }) {
    const query = jest.fn().mockResolvedValue([]);
    const manager = { query } as unknown as EntityManager;
    const user = {
      id: 'usr_admin',
      email,
      role: UserRoles.ADMIN,
    } as User;
    const transaction = jest.fn(
      (callback: (manager: EntityManager) => Promise<User>) =>
        callback(manager),
    );
    const dataSource = {
      transaction,
    } as unknown as DataSource;
    const hashing = {
      hash: jest.fn().mockResolvedValue(passwordHash),
    } as unknown as HashingService;
    const existsByRole = jest
      .fn()
      .mockResolvedValue(options?.adminExists ?? false);
    const findByEmail = jest
      .fn()
      .mockResolvedValue(options?.existingUser ?? null);
    const createUser = jest.fn().mockResolvedValue(user);
    const userRepository = {
      existsByRole,
      findByEmail,
      createUser,
    } as unknown as UserRepository;

    return {
      createUser,
      existsByRole,
      manager,
      query,
      service: new BootstrapAdminService(dataSource, hashing, userRepository),
    };
  }

  it('creates the first ADMIN behind an advisory transaction lock', async () => {
    const { createUser, existsByRole, manager, query, service } = setup();

    const user = await service.bootstrapAdmin(email, password);

    expect(query).toHaveBeenCalledWith('SELECT pg_advisory_xact_lock($1)', [
      811611221,
    ]);
    expect(existsByRole).toHaveBeenCalledWith(UserRoles.ADMIN, manager);
    expect(createUser).toHaveBeenCalledWith(
      email,
      passwordHash,
      UserRoles.ADMIN,
      manager,
    );
    expect(user.role).toBe(UserRoles.ADMIN);
  });

  it('fails closed when an ADMIN already exists', async () => {
    const { createUser, service } = setup({ adminExists: true });

    await expect(service.bootstrapAdmin(email, password)).rejects.toThrow(
      ConflictException,
    );
    expect(createUser).not.toHaveBeenCalled();
  });

  it('rejects a conflicting email before creating the ADMIN', async () => {
    const existingUser = { id: 'usr_existing', email } as User;
    const { createUser, service } = setup({ existingUser });

    await expect(service.bootstrapAdmin(email, password)).rejects.toThrow(
      ConflictException,
    );
    expect(createUser).not.toHaveBeenCalled();
  });
});
