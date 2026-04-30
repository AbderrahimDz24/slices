import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '@users/repositories';
import { HashingService } from '@core/hashing';
import { SignupRepository } from '@auth/repositories';
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
