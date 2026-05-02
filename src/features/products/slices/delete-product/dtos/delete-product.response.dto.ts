import { ApiProperty } from '@nestjs/swagger';

export class DeleteProductResponseDto {
  @ApiProperty({
    example: 'prd_f63886a3ffc04f6b',
    description: 'Identifier of the deleted product',
  })
  id: string;
}
