import { UserRoles } from '@common/enums';
import { CreateAdminUserRequestDto } from './dtos/create-admin-user.request.dto';

export class CreateAdminUserCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly role: UserRoles,
  ) {}

  static fromBody(body: CreateAdminUserRequestDto): CreateAdminUserCommand {
    return new CreateAdminUserCommand(body.email, body.password, body.role);
  }
}
