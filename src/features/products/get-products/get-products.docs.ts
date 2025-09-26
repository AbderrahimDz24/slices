import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { GetProductsResponseDto } from './dto/get-products.response.dto';

/**
 * Custom decorator that groups Swagger docs for the Get Products endpoint.
 */
export function GetProductsDocs() {
  return applyDecorators(
    ApiQuery({
      name: 'category',
      required: false,
      type: String,
      description: 'Filter by category name',
    }),
    ApiQuery({
      name: 'sort',
      required: false,
      enum: ['price_asc', 'price_desc'],
      description: 'Sort by price ascending or descending',
    }),
    ApiOkResponse({
      type: GetProductsResponseDto,
      description: 'List of products',
    }),
  );
}
