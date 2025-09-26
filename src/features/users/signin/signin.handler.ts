import { CommandHandler } from '@nestjs/cqrs';
import { SigninCommand } from './signin.command';
import { SigninService } from './signin.service';
import { SigninResponseDto } from './dto/signin.response.dto';

@CommandHandler(SigninCommand)
export class SigninHandler {
  constructor(private readonly service: SigninService) {}

  async execute(command: SigninCommand): Promise<SigninResponseDto> {
    const { accessToken } = await this.service.signIn(
      command.email,
      command.password,
    );
    return { accessToken };
  }
}
