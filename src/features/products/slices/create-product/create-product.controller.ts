import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductRequestDto } from './dtos/create-product.request.dto';
import { CreateProductResponseDto } from './dtos/create-product.response.dto';
import { CreateProductCommand } from './create-product.command';
import { Mediator } from '@core/cqrs';
import { Roles } from '@auth/decorators';
import { UserRoles } from '@common/enums';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDocs } from './create-product.docs';

@ApiTags('products')
@Controller('products')
export class CreateProductController {
  constructor(private readonly mediator: Mediator) {}

  @Post()
  @Roles(UserRoles.OWNER)
  @CreateProductDocs()
  async createProduct(
    @Body() createProductDto: CreateProductRequestDto,
  ): Promise<CreateProductResponseDto> {
    const command = CreateProductCommand.fromBody(createProductDto);
    return this.mediator.command(command);
  }
}
