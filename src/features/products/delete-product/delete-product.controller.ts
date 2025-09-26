import { Controller, Delete, Param } from '@nestjs/common';
import { Mediator } from '../../../core/cqrs/mediator';
import { DeleteProductResponseDto } from './dto/delete-product.response.dto';
import { DeleteProductCommand } from './delete-product.command';
import { Roles } from '../../../core/auth/roles.decorator';
import { UserRoles } from '../../../core/auth/user-roles.enum';

@Controller('products')
export class DeleteProductController {
  constructor(private readonly mediator: Mediator) {}

  @Delete(':id')
  @Roles(UserRoles.OWNER)
  async deleteProduct(
    @Param('id') id: number,
  ): Promise<DeleteProductResponseDto> {
    const command = DeleteProductCommand.from(id);
    return this.mediator.command(command);
  }
}
