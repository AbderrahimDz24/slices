import { CreateDepositRequestDto } from './dtos/create-deposit.request.dto';

export class CreateDepositCommand {
  constructor(
    public readonly userId: string,
    public readonly amount: number,
    public readonly actorUserId: string,
    public readonly note?: string,
  ) {}

  static fromBody(
    userId: string,
    actorUserId: string,
    body: CreateDepositRequestDto,
  ): CreateDepositCommand {
    return new CreateDepositCommand(
      userId,
      body.amount,
      actorUserId,
      body.note,
    );
  }
}
