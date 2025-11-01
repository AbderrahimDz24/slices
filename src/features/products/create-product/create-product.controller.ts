import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductRequestDto } from './dto/create-product.request.dto';
import { CreateProductResponseDto } from './dto/create-product.response.dto';
import { CreateProductCommand } from './create-product.command';
import { Mediator } from '../../../core/cqrs/mediator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRoles } from '../../../common/enums/user-roles.enum';
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
