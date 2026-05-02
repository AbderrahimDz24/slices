import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { UpdateProductRequestDto } from './dtos/update-product.request.dto';
import { UpdateProductResponseDto } from './dtos/update-product.response.dto';

/**
 * Custom decorator that groups Swagger docs for the Update Product endpoint.
 */
export function UpdateProductDocs() {
  return applyDecorators(
    ApiParam({
      name: 'id',
      type: String,
      description: 'Product ID',
      example: 'prd_f63886a3ffc04f6b',
    }),
    ApiBody({ type: UpdateProductRequestDto }),
    ApiOkResponse({
      type: UpdateProductResponseDto,
      description: 'Product successfully updated',
    }),
  );
}
