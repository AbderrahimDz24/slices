import { ApiProperty } from '@nestjs/swagger';

export class CreateProductResponseDto {
  @ApiProperty({ example: 1, description: 'Identifier of the created product' })
  id: number;
}
