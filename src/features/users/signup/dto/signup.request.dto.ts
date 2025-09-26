import { IsEmail, MinLength } from 'class-validator';

export class SignupRequestDto {
  @IsEmail()
  email: string;

  @MinLength(10)
  password: string;
}
