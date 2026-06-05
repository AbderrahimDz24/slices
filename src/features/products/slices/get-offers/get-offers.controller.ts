import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth, Roles } from '@auth/decorators';
import { AuthType } from '@auth/enums';
import { UserRoles } from '@common/enums';
import { Mediator } from '@core/cqrs';
import { GetOffersResponseDto } from './dtos/get-offers.response.dto';
import { GetOffersDocs } from './get-offers.docs';
import { GetOffersQuery } from './get-offers.query';

@ApiTags('offers')
@Controller('offers')
export class GetOffersController {
  constructor(private readonly mediator: Mediator) {}

  @Get()
  @Auth(AuthType.Bearer, AuthType.ApiKey)
  @Roles(UserRoles.REGULAR)
  @GetOffersDocs()
  async getOffers(): Promise<GetOffersResponseDto> {
    return this.mediator.query(new GetOffersQuery());
  }
}
