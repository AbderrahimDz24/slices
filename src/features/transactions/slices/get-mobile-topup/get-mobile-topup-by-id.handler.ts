import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TopupTransactionDto } from '@transactions/dtos';
import { ReadMobileTopupTransactionService } from '@transactions/services';
import { GetMobileTopupByIdQuery } from './get-mobile-topup-by-id.query';

@QueryHandler(GetMobileTopupByIdQuery)
export class GetMobileTopupByIdHandler
  implements IQueryHandler<GetMobileTopupByIdQuery>
{
  constructor(
    private readonly transactionService: ReadMobileTopupTransactionService,
  ) {}

  async execute(query: GetMobileTopupByIdQuery): Promise<TopupTransactionDto> {
    const transaction = await this.transactionService.getById(
      query.userId,
      query.transactionId,
    );
    return TopupTransactionDto.fromEntity(transaction);
  }
}
