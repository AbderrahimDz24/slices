import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '@auth/decorators';
import { UserRoles } from '@common/enums';
import { Mediator } from '@core/cqrs';
import { CreateAdminUserCommand } from './create-admin-user.command';
import { CreateAdminUserDocs } from './create-admin-user.docs';
import { CreateAdminUserRequestDto } from './dtos/create-admin-user.request.dto';
import { CreateAdminUserResponseDto } from './dtos/create-admin-user.response.dto';

@ApiTags('admin')
@Controller('admin/users')
export class CreateAdminUserController {
  constructor(private readonly mediator: Mediator) {}

  @Post()
  @Roles(UserRoles.OWNER)
  @CreateAdminUserDocs()
  async createUser(
    @Body() dto: CreateAdminUserRequestDto,
  ): Promise<CreateAdminUserResponseDto> {
    return this.mediator.command(CreateAdminUserCommand.fromBody(dto));
  }
}
