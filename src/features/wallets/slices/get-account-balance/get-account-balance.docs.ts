import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AccountBalanceResponseDto } from './dtos/account-balance.response.dto';

export function GetAccountBalanceDocs() {
  return applyDecorators(
    ApiOkResponse({
      type: AccountBalanceResponseDto,
      description: 'Authenticated account balance',
    }),
  );
}
