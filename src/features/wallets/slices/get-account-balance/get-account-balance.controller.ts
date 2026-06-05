import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActiveUser } from '@auth/decorators';
import type { ActiveUserData } from '@auth/common';
import { Mediator } from '@core/cqrs';
import { AccountBalanceResponseDto } from './dtos/account-balance.response.dto';
import { GetAccountBalanceDocs } from './get-account-balance.docs';
import { GetAccountBalanceQuery } from './get-account-balance.query';

@ApiTags('account')
@Controller('account')
export class GetAccountBalanceController {
  constructor(private readonly mediator: Mediator) {}

  @Get()
  @GetAccountBalanceDocs()
  async getAccountBalance(
    @ActiveUser() activeUser: ActiveUserData,
  ): Promise<AccountBalanceResponseDto> {
    return this.mediator.query(new GetAccountBalanceQuery(activeUser.sub));
  }
}
