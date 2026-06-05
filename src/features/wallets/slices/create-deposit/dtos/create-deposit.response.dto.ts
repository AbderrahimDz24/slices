import { ApiProperty } from '@nestjs/swagger';

export class CreateDepositResponseDto {
  @ApiProperty({ example: 'Deposit created successfully' })
  message: string;
}
