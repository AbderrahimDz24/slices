import { ApiProperty } from '@nestjs/swagger';
import { Offer, OfferStatus, ProductType } from '@products/models';
import type { OfferInputSchema } from '@products/models';
import { ProductSummaryDto } from './product-summary.dto';

export class OfferDto {
  @ApiProperty({ example: 'off_0000000000000001' })
  id: string;

  @ApiProperty({ example: 'prepaid' })
  code: string;

  @ApiProperty({ enum: OfferStatus, example: OfferStatus.Active })
  status: OfferStatus;

  @ApiProperty({
    example: {
      id: 'prd_0000000000000001',
      code: 'mobilis',
      name: 'Mobilis',
      type: ProductType.MobileTopup,
    },
  })
  product: ProductSummaryDto;

  @ApiProperty({
    example: {
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
    },
  })
  inputSchema: OfferInputSchema;

  static fromEntity(offer: Offer): OfferDto {
    return {
      id: offer.id,
      code: offer.code,
      status: offer.status,
      product: ProductSummaryDto.fromEntity(offer.product),
      inputSchema: offer.inputSchema,
    };
  }
}
