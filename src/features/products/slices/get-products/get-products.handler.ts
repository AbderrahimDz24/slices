import { GetProductsResponseDto } from './dtos/get-products.response.dto';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductsQuery } from './get-products.query';
import { GetProductsService } from '@products/services';

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
  constructor(private readonly getProductsService: GetProductsService) {}

  async execute(query: GetProductsQuery): Promise<GetProductsResponseDto> {
    const products = await this.getProductsService.getProducts(
      query.category,
      query.sort,
    );
    return GetProductsResponseDto.fromEntities(products);
  }
}
