import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SigninRepository } from './signin.repository';
import { HashingService } from '../../../core/hashing/hashing.service';

@Injectable()
export class SigninService {
  constructor(
    private readonly repo: SigninRepository,
    private readonly hashing: HashingService,
    private readonly jwt: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.repo.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const ok = await this.hashing.compare(password, user.password);
    if (!ok) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = await this.jwt.signAsync(payload);
    return { accessToken };
  }
}
