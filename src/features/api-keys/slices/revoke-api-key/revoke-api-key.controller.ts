import { Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActiveUser, Auth, Roles } from '@auth/decorators';
import type { ActiveUserData } from '@auth/common';
import { AuthType } from '@auth/enums';
import { UserRoles } from '@common/enums';
import { Mediator } from '@core/cqrs';
import { RevokeApiKeyResponseDto } from './dtos/revoke-api-key.response.dto';
import { RevokeApiKeyCommand } from './revoke-api-key.command';
import { RevokeApiKeyDocs } from './revoke-api-key.docs';

@ApiTags('account')
@Controller('account/api-keys')
export class RevokeApiKeyController {
  constructor(private readonly mediator: Mediator) {}

  @Delete(':id')
  @Auth(AuthType.Bearer)
  @Roles(UserRoles.REGULAR)
  @RevokeApiKeyDocs()
  async revokeApiKey(
    @ActiveUser() activeUser: ActiveUserData,
    @Param('id') id: string,
  ): Promise<RevokeApiKeyResponseDto> {
    return this.mediator.command(RevokeApiKeyCommand.from(activeUser.sub, id));
  }
}
