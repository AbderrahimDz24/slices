import { Controller, Delete, Param } from '@nestjs/common';
import { Mediator } from '@core/cqrs';
import { DeleteProductResponseDto } from './dtos/delete-product.response.dto';
import { DeleteProductCommand } from './delete-product.command';
import { Roles } from '@auth/decorators';
import { UserRoles } from '@common/enums';
import { ApiTags } from '@nestjs/swagger';
import { DeleteProductDocs } from './delete-product.docs';

@ApiTags('products')
@Controller('products')
export class DeleteProductController {
  constructor(private readonly mediator: Mediator) {}

  @Delete(':id')
  @Roles(UserRoles.OWNER)
  @DeleteProductDocs()
  async deleteProduct(
    @Param('id') id: number,
  ): Promise<DeleteProductResponseDto> {
    const command = DeleteProductCommand.from(id);
    return this.mediator.command(command);
  }
}
