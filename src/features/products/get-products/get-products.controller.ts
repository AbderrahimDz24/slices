import { Controller, Get } from '@nestjs/common';
import { Mediator } from '../../../core/cqrs/mediator';
import { GetProductsQuery } from './get-products.query';
import { GetProductsResponseDto } from './dto/get-products.response.dto';
import { Public } from '../../../core/auth/public.decorator';

@Controller('products')
export class GetProductsController {
  constructor(private readonly mediator: Mediator) {}

  @Get()
  @Public()
  async getProducts(): Promise<GetProductsResponseDto> {
    return this.mediator.query(new GetProductsQuery());
  }
}
