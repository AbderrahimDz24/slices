import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { TopupTransactionDto } from '@transactions/dtos';

export function GetMobileTopupByExternalIdDocs() {
  return applyDecorators(
    ApiQuery({
      name: 'externalId',
      required: true,
      example: 'client-order-10001',
    }),
    ApiOkResponse({ type: TopupTransactionDto }),
  );
}

export function GetMobileTopupByIdDocs() {
  return applyDecorators(ApiOkResponse({ type: TopupTransactionDto }));
}
