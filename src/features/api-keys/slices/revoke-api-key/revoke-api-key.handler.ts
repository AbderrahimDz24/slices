import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApiKeysService } from '@api-keys/services';
import { RevokeApiKeyResponseDto } from './dtos/revoke-api-key.response.dto';
import { RevokeApiKeyCommand } from './revoke-api-key.command';

@CommandHandler(RevokeApiKeyCommand)
export class RevokeApiKeyHandler
  implements ICommandHandler<RevokeApiKeyCommand>
{
  constructor(private readonly apiKeysService: ApiKeysService) {}

  async execute(
    command: RevokeApiKeyCommand,
  ): Promise<RevokeApiKeyResponseDto> {
    await this.apiKeysService.revokeApiKey(command.userId, command.id);
    return { id: command.id };
  }
}
