import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { WalletService } from '@wallets/services';
import { AccountBalanceResponseDto } from './dtos/account-balance.response.dto';
import { GetAccountBalanceQuery } from './get-account-balance.query';

@QueryHandler(GetAccountBalanceQuery)
export class GetAccountBalanceHandler
  implements IQueryHandler<GetAccountBalanceQuery>
{
  constructor(private readonly walletService: WalletService) {}

  async execute(
    query: GetAccountBalanceQuery,
  ): Promise<AccountBalanceResponseDto> {
    const wallet = await this.walletService.getAccountBalance(query.userId);
    return AccountBalanceResponseDto.fromWallet(wallet);
  }
}
