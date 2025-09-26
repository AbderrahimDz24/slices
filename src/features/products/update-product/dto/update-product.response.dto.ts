import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductResponseDto {
  @ApiProperty({ example: 1, description: 'Identifier of the updated product' })
  id: number;
}
