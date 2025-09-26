import { DeleteProductService } from './delete-product.service';
import { DeleteProductResponseDto } from './dto/delete-product.response.dto';
import { DeleteProductCommand } from './delete-product.command';
import { CommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler {
  constructor(private readonly deleteProductService: DeleteProductService) {}

  async execute(
    command: DeleteProductCommand,
  ): Promise<DeleteProductResponseDto> {
    await this.deleteProductService.deleteProduct(command.id);
    return { id: command.id };
  }
}
