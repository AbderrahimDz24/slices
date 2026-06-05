import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { WalletService } from '@wallets/services';
import { CreateDepositCommand } from './create-deposit.command';
import { CreateDepositResponseDto } from './dtos/create-deposit.response.dto';

@CommandHandler(CreateDepositCommand)
export class CreateDepositHandler
  implements ICommandHandler<CreateDepositCommand>
{
  constructor(private readonly walletService: WalletService) {}

  async execute(
    command: CreateDepositCommand,
  ): Promise<CreateDepositResponseDto> {
    await this.walletService.createDeposit(
      command.userId,
      command.amount,
      command.actorUserId,
      command.note,
    );
    return { message: 'Deposit created successfully' };
  }
}
