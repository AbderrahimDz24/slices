import { CommandHandler } from '@nestjs/cqrs';
import { SignupCommand } from './signup.command';
import { SignupService } from './signup.service';
import { SignupResponseDto } from './dto/signup.response.dto';

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
