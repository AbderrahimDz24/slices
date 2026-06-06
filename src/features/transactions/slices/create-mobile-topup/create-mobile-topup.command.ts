import { CreateMobileTopupRequestDto } from './dtos/create-mobile-topup.request.dto';

export class CreateMobileTopupCommand {
  constructor(
    public readonly userId: string,
    public readonly offerId: string,
    public readonly msisdn: string,
    public readonly amount: number,
    public readonly externalId?: string,
  ) {}

  static fromBody(
    userId: string,
    body: CreateMobileTopupRequestDto,
  ): CreateMobileTopupCommand {
    return new CreateMobileTopupCommand(
      userId,
      body.offerId,
      body.msisdn,
      body.amount,
      body.externalId,
    );
  }
}
