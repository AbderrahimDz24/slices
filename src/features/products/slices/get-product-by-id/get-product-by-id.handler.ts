import { GetProductByIdResponseDto } from './dtos/get-product-by-id.response.dto';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductByIdQuery } from './get-product-by-id.query';
import { GetProductByIdService } from '@products/services';

@QueryHandler(GetProductByIdQuery)
export class GetProductByIdHandler
  implements IQueryHandler<GetProductByIdQuery>
{
  constructor(private readonly getProductByIdService: GetProductByIdService) {}

  async execute(
    query: GetProductByIdQuery,
  ): Promise<GetProductByIdResponseDto> {
    const product = await this.getProductByIdService.getProductById(query.id);
    return GetProductByIdResponseDto.fromEntity(product);
  }
}
