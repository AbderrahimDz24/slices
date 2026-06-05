import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '@auth/decorators';
import { UserRoles } from '@common/enums';
import { Mediator } from '@core/cqrs';
import { CreateUserCommand } from './create-user.command';
import { CreateUserDocs } from './create-user.docs';
import { CreateUserRequestDto } from './dtos/create-user.request.dto';
import { CreateUserResponseDto } from './dtos/create-user.response.dto';

@ApiTags('admin')
@Controller('admin/users')
export class CreateUserController {
  constructor(private readonly mediator: Mediator) {}

  @Post()
  @Roles(UserRoles.ADMIN)
  @CreateUserDocs()
  async createUser(
    @Body() dto: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    return this.mediator.command(CreateUserCommand.fromBody(dto));
  }
}
