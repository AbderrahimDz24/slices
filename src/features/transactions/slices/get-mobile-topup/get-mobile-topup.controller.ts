import { Controller, Get, Param, Query } from '@nestjs/common';
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
import { TopupTransactionDto } from '@transactions/dtos';
import { GetMobileTopupByExternalIdRequestDto } from './dtos/get-mobile-topup-by-external-id.request.dto';
import {
  GetMobileTopupByExternalIdDocs,
  GetMobileTopupByIdDocs,
} from './get-mobile-topup.docs';
import { GetMobileTopupByExternalIdQuery } from './get-mobile-topup-by-external-id.query';
import { GetMobileTopupByIdQuery } from './get-mobile-topup-by-id.query';

@ApiTags('topups')
@Controller('topups')
export class GetMobileTopupController {
  constructor(private readonly mediator: Mediator) {}

  @Get('get-by-external-id')
  @Auth(AuthType.ApiKey)
  @Roles(UserRoles.REGULAR)
  @ClientAccountRateLimit()
  @GetMobileTopupByExternalIdDocs()
  async getMobileTopupByExternalId(
    @ActiveUser() activeUser: ActiveUserData,
    @Query() dto: GetMobileTopupByExternalIdRequestDto,
  ): Promise<TopupTransactionDto> {
    return this.mediator.query(
      new GetMobileTopupByExternalIdQuery(activeUser.sub, dto.externalId),
    );
  }

  @Get(':transactionId')
  @Auth(AuthType.ApiKey)
  @Roles(UserRoles.REGULAR)
  @ClientAccountRateLimit()
  @GetMobileTopupByIdDocs()
  async getMobileTopupById(
    @ActiveUser() activeUser: ActiveUserData,
    @Param('transactionId') transactionId: string,
  ): Promise<TopupTransactionDto> {
    return this.mediator.query(
      new GetMobileTopupByIdQuery(activeUser.sub, transactionId),
    );
  }
}
