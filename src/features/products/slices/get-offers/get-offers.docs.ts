import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiSecurity } from '@nestjs/swagger';
import { GetOffersResponseDto } from './dtos/get-offers.response.dto';

export function GetOffersDocs() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiSecurity('apiKey'),
    ApiOkResponse({
      type: GetOffersResponseDto,
      description: 'Active catalog offers available to the client account',
    }),
  );
}
