import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActiveUser, Auth, Roles } from '@auth/decorators';
import type { ActiveUserData } from '@auth/common';
import { AuthType } from '@auth/enums';
import { UserRoles } from '@common/enums';
import { Mediator } from '@core/cqrs';
import { CreateApiKeyCommand } from './create-api-key.command';
import { CreateApiKeyDocs } from './create-api-key.docs';
import { CreateApiKeyRequestDto } from './dtos/create-api-key.request.dto';
import { CreateApiKeyResponseDto } from './dtos/create-api-key.response.dto';

@ApiTags('account')
@Controller('account/api-keys')
export class CreateApiKeyController {
  constructor(private readonly mediator: Mediator) {}

  @Post()
  @Auth(AuthType.Bearer)
  @Roles(UserRoles.REGULAR)
  @CreateApiKeyDocs()
  async createApiKey(
    @ActiveUser() activeUser: ActiveUserData,
    @Body() dto: CreateApiKeyRequestDto,
  ): Promise<CreateApiKeyResponseDto> {
    return this.mediator.command(
      CreateApiKeyCommand.fromBody(activeUser.sub, dto),
    );
  }
}
