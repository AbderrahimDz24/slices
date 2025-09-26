import { IsEmail, MinLength } from 'class-validator';

export class SigninRequestDto {
  @IsEmail()
  email: string;

  @MinLength(10)
  password: string;
}
