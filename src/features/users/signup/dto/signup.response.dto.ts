import { ApiProperty } from '@nestjs/swagger';

export class SignupResponseDto {
  @ApiProperty({ example: 1, description: 'Identifier of the created user' })
  id: number;
}
