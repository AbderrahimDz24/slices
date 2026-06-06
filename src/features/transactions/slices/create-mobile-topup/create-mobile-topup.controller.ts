import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ActiveUser,
  Auth,
  ClientAccountRateLimit,
  Roles,
} from '@auth/decorators';
import type { ActiveUserData } from '@auth/common';
import { AuthType } from '@auth/enums';
import { UserRoles } from '@common/enums';
import { Mediator } from '@core/cqrs';
import { CreateMobileTopupCommand } from './create-mobile-topup.command';
import { CreateMobileTopupDocs } from './create-mobile-topup.docs';
import { CreateMobileTopupRequestDto } from './dtos/create-mobile-topup.request.dto';
import { CreateMobileTopupResponseDto } from './dtos/create-mobile-topup.response.dto';

@ApiTags('topups')
@Controller('topups')
export class CreateMobileTopupController {
  constructor(private readonly mediator: Mediator) {}

  @Post()
  @Auth(AuthType.ApiKey)
  @Roles(UserRoles.REGULAR)
  @ClientAccountRateLimit()
  @CreateMobileTopupDocs()
  async createMobileTopup(
    @ActiveUser() activeUser: ActiveUserData,
    @Body() dto: CreateMobileTopupRequestDto,
  ): Promise<CreateMobileTopupResponseDto> {
    return this.mediator.command(
      CreateMobileTopupCommand.fromBody(activeUser.sub, dto),
    );
  }
}
