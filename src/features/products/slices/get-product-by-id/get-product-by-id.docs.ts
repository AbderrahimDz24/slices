import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { GetProductByIdResponseDto } from './dtos/get-product-by-id.response.dto';

/**
 * Custom decorator that groups Swagger docs for the Get Product By Id endpoint.
 */
export function GetProductByIdDocs() {
  return applyDecorators(
    ApiParam({
      name: 'id',
      type: String,
      description: 'Product ID',
      example: 'prd_f63886a3ffc04f6b',
    }),
    ApiOkResponse({
      type: GetProductByIdResponseDto,
      description: 'Product details',
    }),
  );
}
