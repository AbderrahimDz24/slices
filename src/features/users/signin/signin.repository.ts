import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../_shared/user.entity';

@Injectable()
export class SigninRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  findByEmail(email: string) {
    return this.findOne({ where: { email } });
  }
}
