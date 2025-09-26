import { UpdateProductService } from './update-product.service';
import { UpdateProductResponseDto } from './dto/update-product.response.dto';
import { UpdateProductCommand } from './update-product.command';
import { CommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler {
  constructor(private readonly updateProductService: UpdateProductService) {}

  async execute(
    command: UpdateProductCommand,
  ): Promise<UpdateProductResponseDto> {
    const product = await this.updateProductService.updateProduct(
      command.id,
      command.name,
      command.price,
      command.description,
      command.category,
      command.image,
    );
    return { id: product.id };
  }
}
