import { ApiProperty } from '@nestjs/swagger';
import { Offer } from '@products/models';
import { OfferDto } from './offer.dto';

export class GetOffersResponseDto {
  @ApiProperty({ type: [OfferDto] })
  offers: OfferDto[];

  static fromEntities(offers: Offer[]): GetOffersResponseDto {
    return {
      offers: offers.map((offer) => OfferDto.fromEntity(offer)),
    };
  }
}
