import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductRequestDto } from './dto/create-product.request.dto';
import { CreateProductResponseDto } from './dto/create-product.response.dto';
import { CreateProductCommand } from './create-product.command';
import { Mediator } from '../../../core/cqrs/mediator';
import { Roles } from '../../../core/auth/roles.decorator';
import { UserRoles } from '../../../core/auth/user-roles.enum';

@Controller('products')
export class CreateProductController {
  constructor(private readonly mediator: Mediator) {}

  @Post()
  @Roles(UserRoles.OWNER)
  async createProduct(
    @Body() createProductDto: CreateProductRequestDto,
  ): Promise<CreateProductResponseDto> {
    const command = CreateProductCommand.fromBody(createProductDto);
    return this.mediator.command(command);
  }
}
