export class RevokeApiKeyCommand {
  constructor(
    public readonly userId: string,
    public readonly id: string,
  ) {}

  static from(userId: string, id: string): RevokeApiKeyCommand {
    return new RevokeApiKeyCommand(userId, id);
  }
}
