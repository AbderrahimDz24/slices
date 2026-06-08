import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transaction, TransactionStatus } from '@transactions/models';

export class TopupTransactionDto {
  @ApiProperty({ example: 'txn_2c4f7a9d0a1b2c3d' })
  id: string;

  @ApiProperty({
    enum: TransactionStatus,
    example: TransactionStatus.Confirmed,
  })
  status: TransactionStatus;

  @ApiProperty({ example: 'off_mobilis__prepaid' })
  offerId: string;

  @ApiProperty({ example: 'prd_mobilis_00000001' })
  productId: string;

  @ApiProperty({ example: 'mobilis' })
  productCode: string;

  @ApiProperty({ example: 1000 })
  amount: number;

  @ApiProperty({ example: 'DZD' })
  currency: string;

  @ApiProperty({ example: '+213612345678' })
  msisdn: string;

  @ApiPropertyOptional({ example: 'client-order-10001', nullable: true })
  externalId: string | null;

  @ApiPropertyOptional({
    example: 'Provider declined transaction',
    nullable: true,
  })
  failureReason: string | null;

  @ApiProperty({ example: '2025-07-15T10:20:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-07-15T10:20:00.000Z' })
  updatedAt: Date;

  static fromEntity(transaction: Transaction): TopupTransactionDto {
    const inputs = transaction.inputs;
    const dto = new TopupTransactionDto();
    dto.id = transaction.id;
    dto.status = transaction.status;
    dto.offerId = transaction.offerId;
    dto.productId = transaction.productId;
    dto.productCode = transaction.productCode;
    dto.amount = transaction.amount;
    dto.currency = transaction.currency;
    dto.msisdn = inputs.msisdn;
    dto.externalId = transaction.externalId;
    dto.failureReason = transaction.failureReason;
    dto.createdAt = transaction.createdAt;
    dto.updatedAt = transaction.updatedAt;
    return dto;
  }
}
