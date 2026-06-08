export class GetMobileTopupByIdQuery {
  constructor(
    public readonly userId: string,
    public readonly transactionId: string,
  ) {}
}
