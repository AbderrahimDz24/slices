import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOffersService } from '@products/services';
import { GetOffersResponseDto } from './dtos/get-offers.response.dto';
import { GetOffersQuery } from './get-offers.query';

@QueryHandler(GetOffersQuery)
export class GetOffersHandler implements IQueryHandler<GetOffersQuery> {
  constructor(private readonly getOffersService: GetOffersService) {}

  async execute(): Promise<GetOffersResponseDto> {
    const offers = await this.getOffersService.getActiveOffers();
    return GetOffersResponseDto.fromEntities(offers);
  }
}
