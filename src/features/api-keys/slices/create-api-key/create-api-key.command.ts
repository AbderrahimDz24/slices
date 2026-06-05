import { CreateApiKeyRequestDto } from './dtos/create-api-key.request.dto';

export class CreateApiKeyCommand {
  constructor(
    public readonly userId: string,
    public readonly name: string,
  ) {}

  static fromBody(
    userId: string,
    body: CreateApiKeyRequestDto,
  ): CreateApiKeyCommand {
    return new CreateApiKeyCommand(userId, body.name);
  }
}
