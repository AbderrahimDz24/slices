import { CommandHandler } from '@nestjs/cqrs';
import { RefreshTokenCommand } from './refresh-token.command';
import { RefreshTokenService } from './refresh-token.service';
import { SigninResponseDto } from '../signin/dto/signin.response.dto';

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
