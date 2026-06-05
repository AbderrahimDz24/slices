import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserService } from '@users/services';
import { CreateAdminUserCommand } from './create-admin-user.command';
import { CreateAdminUserResponseDto } from './dtos/create-admin-user.response.dto';

@CommandHandler(CreateAdminUserCommand)
export class CreateAdminUserHandler
  implements ICommandHandler<CreateAdminUserCommand>
{
  constructor(private readonly createUserService: CreateUserService) {}

  async execute(
    command: CreateAdminUserCommand,
  ): Promise<CreateAdminUserResponseDto> {
    const user = await this.createUserService.createUser(
      command.email,
      command.password,
      command.role,
    );
    return { id: user.id };
  }
}
