import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMobileTopupTransactionService } from '@transactions/services';
import { CreateMobileTopupCommand } from './create-mobile-topup.command';
import { CreateMobileTopupResponseDto } from './dtos/create-mobile-topup.response.dto';

@CommandHandler(CreateMobileTopupCommand)
export class CreateMobileTopupHandler
  implements ICommandHandler<CreateMobileTopupCommand>
{
  constructor(
    private readonly transactionService: CreateMobileTopupTransactionService,
  ) {}

  async execute(
    command: CreateMobileTopupCommand,
  ): Promise<CreateMobileTopupResponseDto> {
    const created = await this.transactionService.create({
      userId: command.userId,
      offerId: command.offerId,
      msisdn: command.msisdn,
      amount: command.amount,
      externalId: command.externalId,
    });

    return CreateMobileTopupResponseDto.fromEntity(created.transaction);
  }
}
