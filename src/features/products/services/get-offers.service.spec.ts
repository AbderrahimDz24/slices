import { InternalServerErrorException } from '@nestjs/common';
import { Offer, OfferStatus, ProductType } from '@products/models';
import { OfferRepository } from '@products/repositories';
import { GetOffersService } from './get-offers.service';

describe('GetOffersService', () => {
  function offer(inputSchema: unknown): Offer {
    return {
      id: 'off_0000000000000001',
      productId: 'prd_0000000000000001',
      code: 'prepaid',
      status: OfferStatus.Active,
      inputSchema,
      product: {
        id: 'prd_0000000000000001',
        code: 'mobilis',
        name: 'Mobilis',
        type: ProductType.MobileTopup,
      },
    } as Offer;
  }

  it('returns active offers after parsing their input schemas', async () => {
    const validSchema = {
      version: 1,
      fields: [
        {
          name: 'msisdn',
          type: 'string',
          required: true,
          constraints: { format: 'DZ_E164_MSISDN' },
        },
        {
          name: 'amount',
          type: 'integer',
          required: true,
          constraints: { min: 100, max: 10000, currency: 'DZD' },
        },
      ],
    };
    const findActiveOffers = jest.fn().mockResolvedValue([offer(validSchema)]);
    const repository = {
      findActiveOffers,
    } as unknown as OfferRepository;
    const service = new GetOffersService(repository);

    await expect(service.getActiveOffers()).resolves.toEqual([
      expect.objectContaining({ inputSchema: validSchema }),
    ]);
    expect(findActiveOffers).toHaveBeenCalledTimes(1);
  });

  it('fails closed when a stored input schema is malformed', async () => {
    const repository = {
      findActiveOffers: jest
        .fn()
        .mockResolvedValue([offer({ version: 1, fields: [] })]),
    } as unknown as OfferRepository;
    const service = new GetOffersService(repository);

    await expect(service.getActiveOffers()).rejects.toBeInstanceOf(
      InternalServerErrorException,
    );
  });
});
