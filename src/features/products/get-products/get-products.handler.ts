import { GetProductsService } from './get-products.service';
import { GetProductsResponseDto } from './dto/get-products.response.dto';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductsQuery } from './get-products.query';

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
  constructor(private readonly getProductsService: GetProductsService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetProductsQuery): Promise<GetProductsResponseDto> {
    const products = await this.getProductsService.getProducts();
    return GetProductsResponseDto.fromEntities(products);
  }
}
