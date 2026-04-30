import { UpdateProductRequestDto } from './dtos/update-product.request.dto';

export class UpdateProductCommand {
  id: number;
  name?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;

  static from(id: number, body: UpdateProductRequestDto): UpdateProductCommand {
    const command = new UpdateProductCommand();
    command.id = id;
    command.name = body.name;
    command.price = body.price;
    command.description = body.description;
    command.category = body.category;
    command.image = body.image;
    return command;
  }
}
