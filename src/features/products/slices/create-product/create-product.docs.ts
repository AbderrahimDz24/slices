import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateProductRequestDto } from './dtos/create-product.request.dto';
import { CreateProductResponseDto } from './dtos/create-product.response.dto';

/**
 * Custom decorator that groups Swagger docs for the Create Product endpoint.
 */
export function CreateProductDocs() {
  return applyDecorators(
    ApiBody({ type: CreateProductRequestDto }),
    ApiCreatedResponse({
      type: CreateProductResponseDto,
      description: 'Product successfully created',
    }),
  );
}
