import { CreateProductService } from './create-product.service';
import { CreateProductResponseDto } from './dto/create-product.response.dto';
import { CreateProductCommand } from './create-product.command';
import { CommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler {
  constructor(private readonly createProductService: CreateProductService) {}

  async execute(
    command: CreateProductCommand,
  ): Promise<CreateProductResponseDto> {
    const product = await this.createProductService.createProduct(
      command.name,
      command.price,
      command.description,
      command.category,
      command.image,
    );
    return { id: product.id };
  }
}
