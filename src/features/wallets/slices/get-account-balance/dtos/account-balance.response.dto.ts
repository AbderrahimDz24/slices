import { ApiProperty } from '@nestjs/swagger';
import { Wallet } from '@wallets/models';

export class AccountBalanceResponseDto {
  @ApiProperty({ example: 20850 })
  availableBalance: number;

  @ApiProperty({ example: 1500 })
  reservedBalance: number;

  @ApiProperty({ example: 22350 })
  totalBalance: number;

  @ApiProperty({ example: 'DZD' })
  currency: string;

  @ApiProperty({ example: '2025-07-15T10:20:00.000Z' })
  updatedAt: Date;

  static fromWallet(wallet: Wallet): AccountBalanceResponseDto {
    const dto = new AccountBalanceResponseDto();
    dto.availableBalance = wallet.availableBalance;
    dto.reservedBalance = wallet.reservedBalance;
    dto.totalBalance = wallet.availableBalance + wallet.reservedBalance;
    dto.currency = wallet.currency;
    dto.updatedAt = wallet.updatedAt;
    return dto;
  }
}
