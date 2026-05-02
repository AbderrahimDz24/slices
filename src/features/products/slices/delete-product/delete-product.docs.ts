import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { DeleteProductResponseDto } from './dtos/delete-product.response.dto';

/**
 * Custom decorator that groups Swagger docs for the Delete Product endpoint.
 */
export function DeleteProductDocs() {
  return applyDecorators(
    ApiParam({
      name: 'id',
      type: String,
      description: 'Product ID',
      example: 'prd_f63886a3ffc04f6b',
    }),
    ApiOkResponse({
      type: DeleteProductResponseDto,
      description: 'Product successfully deleted',
    }),
  );
}
