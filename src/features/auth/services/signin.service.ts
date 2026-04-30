import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '@users/repositories';
import { HashingService } from '@core/hashing';
import { AuthService } from './auth.service';

@Injectable()
export class SigninService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashing: HashingService,
    private readonly authService: AuthService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const ok = await this.hashing.compare(password, user.password);
    if (!ok) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.generateTokens(user);
  }
}
