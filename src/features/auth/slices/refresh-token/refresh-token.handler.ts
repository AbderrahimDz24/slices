import { CommandHandler } from '@nestjs/cqrs';
import { RefreshTokenService } from '@auth/services';
import { RefreshTokenCommand } from './refresh-token.command';
import { SigninResponseDto } from '@auth/dtos';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler {
  constructor(private readonly service: RefreshTokenService) {}

  async execute(command: RefreshTokenCommand): Promise<SigninResponseDto> {
    const { accessToken, refreshToken } = await this.service.refresh(
      command.refreshToken,
    );
    return { accessToken, refreshToken };
  }
}
