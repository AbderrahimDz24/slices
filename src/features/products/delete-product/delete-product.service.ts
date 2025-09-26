import { Injectable } from '@nestjs/common';
import { DeleteProductRepository } from './delete-product.repository';

@Injectable()
export class DeleteProductService {
  constructor(private readonly productRepository: DeleteProductRepository) {}

  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.deleteProduct(id);
  }
}
