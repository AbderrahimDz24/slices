import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { DeleteProductResponseDto } from './dtos/delete-product.response.dto';

/**
 * Custom decorator that groups Swagger docs for the Delete Product endpoint.
 */
export function DeleteProductDocs() {
  return applyDecorators(
    ApiParam({ name: 'id', type: Number, description: 'Product ID' }),
    ApiOkResponse({
      type: DeleteProductResponseDto,
      description: 'Product successfully deleted',
    }),
  );
}
