import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { UserRoles } from '@common/enums';
import { User } from '../models';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  findByEmail(email: string, manager?: EntityManager) {
    const repository = manager?.getRepository(User) ?? this;
    return repository.findOne({ where: { email } });
  }

  async existsByRole(
    role: UserRoles,
    manager?: EntityManager,
  ): Promise<boolean> {
    const repository = manager?.getRepository(User) ?? this;
    return repository.exists({ where: { role } });
  }

  async createUser(
    email: string,
    passwordHash: string,
    role: UserRoles = UserRoles.REGULAR,
    manager?: EntityManager,
  ): Promise<User> {
    const repository = manager?.getRepository(User) ?? this;
    const user = repository.create({ email, password: passwordHash, role });
    await repository.save(user);
    return user;
  }
}
