import { CreateProductRequestDto } from './dto/create-product.request.dto';

export class CreateProductCommand {
  name: string;
  price: number;
  description?: string;
  category?: string;
  image?: string;

  static fromBody(body: CreateProductRequestDto): CreateProductCommand {
    const command = new CreateProductCommand();
    command.name = body.name;
    command.price = body.price;
    command.description = body.description;
    command.category = body.category;
    command.image = body.image;
    return command;
  }
}
