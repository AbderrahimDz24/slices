import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiParam } from '@nestjs/swagger';
import { CreateDepositRequestDto } from './dtos/create-deposit.request.dto';
import { CreateDepositResponseDto } from './dtos/create-deposit.response.dto';

export function CreateDepositDocs() {
  return applyDecorators(
    ApiParam({
      name: 'userId',
      type: String,
      description: 'Target user/client-account ID',
      example: 'usr_f63886a3ffc04f6b',
    }),
    ApiBody({ type: CreateDepositRequestDto }),
    ApiCreatedResponse({
      type: CreateDepositResponseDto,
      description: 'Deposit successfully created',
    }),
  );
}
