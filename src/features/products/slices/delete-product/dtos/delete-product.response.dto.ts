import { ApiProperty } from '@nestjs/swagger';

export class DeleteProductResponseDto {
  @ApiProperty({ example: 1, description: 'Identifier of the deleted product' })
  id: number;
}
