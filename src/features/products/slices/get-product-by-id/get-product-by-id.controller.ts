import { Controller, Get, Param } from '@nestjs/common';
import { Mediator } from '@core/cqrs';
import { GetProductByIdQuery } from './get-product-by-id.query';
import { GetProductByIdResponseDto } from './dtos/get-product-by-id.response.dto';
import { Public } from '@auth/decorators';
import { ApiTags } from '@nestjs/swagger';
import { GetProductByIdDocs } from './get-product-by-id.docs';

@ApiTags('products')
@Controller('products')
export class GetProductByIdController {
  constructor(private readonly mediator: Mediator) {}

  @Get(':id')
  @Public()
  @GetProductByIdDocs()
  async getProductById(
    @Param('id') id: number,
  ): Promise<GetProductByIdResponseDto> {
    return this.mediator.query(new GetProductByIdQuery(id));
  }
}
