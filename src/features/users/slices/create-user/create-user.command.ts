import { UserRoles } from '@common/enums';
import { CreateUserRequestDto } from './dtos/create-user.request.dto';

export class CreateUserCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly role: UserRoles,
  ) {}

  static fromBody(body: CreateUserRequestDto): CreateUserCommand {
    return new CreateUserCommand(body.email, body.password, body.role);
  }
}
