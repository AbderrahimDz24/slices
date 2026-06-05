import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApiKeysService } from '@api-keys/services';
import { CreateApiKeyCommand } from './create-api-key.command';
import { CreateApiKeyResponseDto } from './dtos/create-api-key.response.dto';

@CommandHandler(CreateApiKeyCommand)
export class CreateApiKeyHandler
  implements ICommandHandler<CreateApiKeyCommand>
{
  constructor(private readonly apiKeysService: ApiKeysService) {}

  async execute(
    command: CreateApiKeyCommand,
  ): Promise<CreateApiKeyResponseDto> {
    const created = await this.apiKeysService.createApiKey(
      command.userId,
      command.name,
    );
    return CreateApiKeyResponseDto.fromCreatedApiKey(created);
  }
}
