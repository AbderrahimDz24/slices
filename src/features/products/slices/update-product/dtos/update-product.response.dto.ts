import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductResponseDto {
  @ApiProperty({
    example: 'prd_f63886a3ffc04f6b',
    description: 'Identifier of the updated product',
  })
  id: string;
}
