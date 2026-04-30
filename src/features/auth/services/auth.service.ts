import { Inject, Injectable } from '@nestjs/common';
import * as config from '@nestjs/config';
import { JwtService, type JwtSignOptions } from '@nestjs/jwt';
import { ActiveUserData } from '@auth/common';
import { User } from '@users/models';
import jwtConfig from '../core/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: config.ConfigType<typeof jwtConfig>,
  ) {}

  async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        { email: user.email, role: user.role },
      ),
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  private async signToken<T>(
    userId: string,
    expiresIn: JwtSignOptions['expiresIn'],
    payload?: T,
  ) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      { expiresIn },
    );
  }
}
