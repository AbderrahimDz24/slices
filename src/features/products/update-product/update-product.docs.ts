import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { UpdateProductRequestDto } from './dto/update-product.request.dto';
import { UpdateProductResponseDto } from './dto/update-product.response.dto';

/**
 * Custom decorator that groups Swagger docs for the Update Product endpoint.
 */
export function UpdateProductDocs() {
  return applyDecorators(
    ApiParam({ name: 'id', type: Number, description: 'Product ID' }),
    ApiBody({ type: UpdateProductRequestDto }),
    ApiOkResponse({
      type: UpdateProductResponseDto,
      description: 'Product successfully updated',
    }),
  );
}
