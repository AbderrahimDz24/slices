import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateMobileTopupRequestDto } from './dtos/create-mobile-topup.request.dto';
import { CreateMobileTopupResponseDto } from './dtos/create-mobile-topup.response.dto';

export function CreateMobileTopupDocs() {
  return applyDecorators(
    ApiBody({ type: CreateMobileTopupRequestDto }),
    ApiCreatedResponse({
      type: CreateMobileTopupResponseDto,
      description: 'Mobile topup transaction created and funds reserved.',
    }),
  );
}
