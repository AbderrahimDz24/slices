import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  InvalidOfferInputSchemaError,
  Offer,
  parseOfferInputSchema,
} from '@products/models';
import { OfferRepository } from '@products/repositories';

@Injectable()
export class GetOffersService {
  constructor(private readonly offerRepository: OfferRepository) {}

  async getActiveOffers(): Promise<Offer[]> {
    const offers = await this.offerRepository.findActiveOffers();

    return offers.map((offer) => {
      try {
        offer.inputSchema = parseOfferInputSchema(offer.inputSchema);
        return offer;
      } catch (error) {
        if (error instanceof InvalidOfferInputSchemaError) {
          throw new InternalServerErrorException(
            'Catalog offer input schema is invalid',
          );
        }
        throw error;
      }
    });
  }
}
