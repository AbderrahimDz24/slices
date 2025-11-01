import { ApiProperty } from '@nestjs/swagger';

export class SignupResponseDto {
  @ApiProperty({
    example: 'f63886a3-ffc0-4f6b-a8c4-57bc85bfd527',
    description: 'Identifier of the created user',
  })
  id: string;
}
