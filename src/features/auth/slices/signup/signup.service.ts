import { ConflictException, Injectable } from '@nestjs/common';
import { SignupRepository } from './signup.repository';
import { UserRepository } from '@users/repositores';
import { HashingService } from '@core/hashing';
import { User } from '@users/models';

@Injectable()
export class SignupService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly repo: SignupRepository,
    private readonly hashing: HashingService,
  ) {}

  async signUp(email: string, password: string): Promise<User> {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new ConflictException('Email already in use');
    }
    const passwordHash = await this.hashing.hash(password);
    return await this.repo.createUser(email, passwordHash);
  }
}
