import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserService } from '@users/services';
import { CreateUserCommand } from './create-user.command';
import { CreateUserResponseDto } from './dtos/create-user.response.dto';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly createUserService: CreateUserService) {}

  async execute(command: CreateUserCommand): Promise<CreateUserResponseDto> {
    const user = await this.createUserService.createUser(
      command.email,
      command.password,
      command.role,
    );
    return { id: user.id };
  }
}
