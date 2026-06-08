export class GetMobileTopupByExternalIdQuery {
  constructor(
    public readonly userId: string,
    public readonly externalId: string,
  ) {}
}
