import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '@users/models';

@Injectable()
export class SignupRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(email: string, passwordHash: string): Promise<User> {
    const user = this.create({ email, password: passwordHash });
    await this.save(user);
    return user;
  }
}
