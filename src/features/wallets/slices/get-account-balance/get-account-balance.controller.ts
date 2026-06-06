import { Controller, Get } from '@nestjs/common';
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
import { AccountBalanceResponseDto } from './dtos/account-balance.response.dto';
import { GetAccountBalanceDocs } from './get-account-balance.docs';
import { GetAccountBalanceQuery } from './get-account-balance.query';

@ApiTags('account')
@Controller('account')
export class GetAccountBalanceController {
  constructor(private readonly mediator: Mediator) {}

  @Get()
  @Auth(AuthType.Bearer, AuthType.ApiKey)
  @Roles(UserRoles.REGULAR)
  @ClientAccountRateLimit()
  @GetAccountBalanceDocs()
  async getAccountBalance(
    @ActiveUser() activeUser: ActiveUserData,
  ): Promise<AccountBalanceResponseDto> {
    return this.mediator.query(new GetAccountBalanceQuery(activeUser.sub));
  }
}
