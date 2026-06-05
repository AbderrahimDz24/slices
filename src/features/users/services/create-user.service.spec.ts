import { DataSource, EntityManager } from 'typeorm';
import { UserRoles } from '@common/enums';
import { HashingService } from '@core/hashing';
import { WalletService } from '@wallets/services';
import type { User } from '@users/models';
import { UserRepository } from '@users/repositories';
import { CreateUserService } from './create-user.service';

describe('CreateUserService', () => {
  const password = 'strongPassword123';
  const passwordHash = 'hashed-password';

  function setup() {
    const manager = {} as EntityManager;
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
    const createUser = jest.fn(
      (email: string, _hash: string, role: UserRoles): Promise<User> =>
        Promise.resolve({
          id: `usr_${role.toLowerCase()}`,
          email,
          role,
        } as User),
    );
    const userRepository = {
      findByEmail: jest.fn().mockResolvedValue(null),
      createUser,
    } as unknown as UserRepository;
    const createWalletForUser = jest.fn().mockResolvedValue({ id: 'wal_1' });
    const walletService = {
      createWalletForUser,
    } as unknown as WalletService;

    return {
      createWalletForUser,
      manager,
      service: new CreateUserService(
        dataSource,
        hashing,
        userRepository,
        walletService,
      ),
    };
  }

  it('creates a wallet for REGULAR users', async () => {
    const { createWalletForUser, manager, service } = setup();

    const user = await service.createUser(
      'client@example.com',
      password,
      UserRoles.REGULAR,
    );

    expect(user).toMatchObject({ role: UserRoles.REGULAR });
    expect(createWalletForUser).toHaveBeenCalledWith(user.id, manager);
  });

  it('does not create a wallet for ADMIN users', async () => {
    const { createWalletForUser, service } = setup();

    const user = await service.createUser(
      'admin@example.com',
      password,
      UserRoles.ADMIN,
    );

    expect(user).toMatchObject({ role: UserRoles.ADMIN });
    expect(createWalletForUser).not.toHaveBeenCalled();
  });
});
