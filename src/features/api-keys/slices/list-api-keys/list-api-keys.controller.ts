import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActiveUser, Auth, Roles } from '@auth/decorators';
import type { ActiveUserData } from '@auth/common';
import { AuthType } from '@auth/enums';
import { UserRoles } from '@common/enums';
import { Mediator } from '@core/cqrs';
import { ListApiKeysResponseDto } from './dtos/list-api-keys.response.dto';
import { ListApiKeysDocs } from './list-api-keys.docs';
import { ListApiKeysQuery } from './list-api-keys.query';

@ApiTags('account')
@Controller('account/api-keys')
export class ListApiKeysController {
  constructor(private readonly mediator: Mediator) {}

  @Get()
  @Auth(AuthType.Bearer)
  @Roles(UserRoles.REGULAR)
  @ListApiKeysDocs()
  async listApiKeys(
    @ActiveUser() activeUser: ActiveUserData,
  ): Promise<ListApiKeysResponseDto> {
    return this.mediator.query(new ListApiKeysQuery(activeUser.sub));
  }
}
