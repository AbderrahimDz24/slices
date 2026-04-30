import { CommandHandler } from '@nestjs/cqrs';
import { SignupService } from '@auth/services';
import { SignupCommand } from './signup.command';
import { SignupResponseDto } from './dtos/signup.response.dto';

@CommandHandler(SignupCommand)
export class SignupHandler {
  constructor(private readonly signupService: SignupService) {}

  async execute(command: SignupCommand): Promise<SignupResponseDto> {
    const user = await this.signupService.signUp(
      command.email,
      command.password,
    );
    return { id: user.id };
  }
}
