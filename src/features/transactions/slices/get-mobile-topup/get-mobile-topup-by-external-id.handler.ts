import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TopupTransactionDto } from '@transactions/dtos';
import { ReadMobileTopupTransactionService } from '@transactions/services';
import { GetMobileTopupByExternalIdQuery } from './get-mobile-topup-by-external-id.query';

@QueryHandler(GetMobileTopupByExternalIdQuery)
export class GetMobileTopupByExternalIdHandler
  implements IQueryHandler<GetMobileTopupByExternalIdQuery>
{
  constructor(
    private readonly transactionService: ReadMobileTopupTransactionService,
  ) {}

  async execute(
    query: GetMobileTopupByExternalIdQuery,
  ): Promise<TopupTransactionDto> {
    const transaction = await this.transactionService.getByExternalId(
      query.userId,
      query.externalId,
    );
    return TopupTransactionDto.fromEntity(transaction);
  }
}
