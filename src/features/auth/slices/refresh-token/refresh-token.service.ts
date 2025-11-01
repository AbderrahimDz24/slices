import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenPayload } from './jwt-payload.interface';
import { AuthService } from '../../core/services';
import { UserRepository } from '@users/repositores';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly jwt: JwtService,
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  async refresh(
    submittedRefreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    let payload: RefreshTokenPayload;
    try {
      payload = await this.jwt.verifyAsync<RefreshTokenPayload>(
        submittedRefreshToken,
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const { sub } = payload ?? {};
    if (!sub) {
      throw new UnauthorizedException('Invalid refresh token payload');
    }
    const user = await this.userRepository.findOneByOrFail({ id: sub });
    return this.authService.generateTokens(user);
  }
}
