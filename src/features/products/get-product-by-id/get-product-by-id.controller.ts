import { Controller, Get, Param } from '@nestjs/common';
import { Mediator } from '../../../core/cqrs/mediator';
import { GetProductByIdQuery } from './get-product-by-id.query';
import { GetProductByIdResponseDto } from './dto/get-product-by-id.response.dto';
import { Public } from '../../../core/auth/public.decorator';

@Controller('products')
export class GetProductByIdController {
  constructor(private readonly mediator: Mediator) {}

  @Get(':id')
  @Public()
  async getProductById(
    @Param('id') id: number,
  ): Promise<GetProductByIdResponseDto> {
    return this.mediator.query(new GetProductByIdQuery(id));
  }
}
