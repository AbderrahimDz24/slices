import { Transaction } from '@transactions/models';
import { TopupTransactionDto } from '@transactions/dtos';

export class CreateMobileTopupResponseDto extends TopupTransactionDto {
  static fromEntity(transaction: Transaction): CreateMobileTopupResponseDto {
    return Object.assign(
      new CreateMobileTopupResponseDto(),
      TopupTransactionDto.fromEntity(transaction),
    );
  }
}
