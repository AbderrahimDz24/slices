import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ApiKeysService } from '@api-keys/services';
import { ListApiKeysResponseDto } from './dtos/list-api-keys.response.dto';
import { ListApiKeysQuery } from './list-api-keys.query';

@QueryHandler(ListApiKeysQuery)
export class ListApiKeysHandler implements IQueryHandler<ListApiKeysQuery> {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  async execute(query: ListApiKeysQuery): Promise<ListApiKeysResponseDto> {
    const apiKeys = await this.apiKeysService.listActiveApiKeys(query.userId);
    return ListApiKeysResponseDto.fromEntities(apiKeys);
  }
}
