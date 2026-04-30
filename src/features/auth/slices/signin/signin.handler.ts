import { CommandHandler } from '@nestjs/cqrs';
import { SigninService } from '@auth/services';
import { SigninCommand } from './signin.command';
import { SigninResponseDto } from './dtos/signin.response.dto';

@CommandHandler(SigninCommand)
export class SigninHandler {
  constructor(private readonly service: SigninService) {}

  async execute(command: SigninCommand): Promise<SigninResponseDto> {
    const { accessToken, refreshToken } = await this.service.signIn(
      command.email,
      command.password,
    );
    return { accessToken, refreshToken };
  }
}
