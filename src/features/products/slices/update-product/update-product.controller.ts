import { Body, Controller, Param, Put } from '@nestjs/common';
import { Mediator } from '@core/cqrs';
import { UpdateProductRequestDto } from './dtos/update-product.request.dto';
import { UpdateProductResponseDto } from './dtos/update-product.response.dto';
import { UpdateProductCommand } from './update-product.command';
import { Roles } from '@auth/decorators';
import { UserRoles } from '@common/enums';
import { ApiTags } from '@nestjs/swagger';
import { UpdateProductDocs } from './update-product.docs';

@ApiTags('products')
@Controller('products')
export class UpdateProductController {
  constructor(private readonly mediator: Mediator) {}

  @Put(':id')
  @Roles(UserRoles.OWNER)
  @UpdateProductDocs()
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductRequestDto,
  ): Promise<UpdateProductResponseDto> {
    const command = UpdateProductCommand.from(id, updateProductDto);
    return this.mediator.command(command);
  }
}
