import { Controller, Get, Query } from '@nestjs/common';
import { Mediator } from '@core/cqrs';
import { GetProductsQuery } from './get-products.query';
import { GetProductsResponseDto } from './dtos/get-products.response.dto';
import { Public } from '@auth/decorators';
import { ApiTags } from '@nestjs/swagger';
import { GetProductsDocs } from './get-products.docs';

@ApiTags('products')
@Controller('products')
export class GetProductsController {
  constructor(private readonly mediator: Mediator) {}

  @Get()
  @Public()
  @GetProductsDocs()
  async getProducts(
    @Query('category') category?: string,
    @Query('sort') sort?: string,
  ): Promise<GetProductsResponseDto> {
    return this.mediator.query(new GetProductsQuery(category, sort));
  }
}
