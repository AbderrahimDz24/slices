import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminUserResponseDto {
  @ApiProperty({
    example: 'usr_f63886a3ffc04f6b',
    description: 'Identifier of the created user',
  })
  id: string;
}
