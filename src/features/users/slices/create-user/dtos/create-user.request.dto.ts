import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, MinLength } from 'class-validator';
import { UserRoles } from '@common/enums';

export class CreateUserRequestDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongPassword123' })
  @MinLength(10)
  password: string;

  @ApiProperty({ enum: UserRoles, example: UserRoles.REGULAR })
  @IsEnum(UserRoles)
  role: UserRoles;
}
