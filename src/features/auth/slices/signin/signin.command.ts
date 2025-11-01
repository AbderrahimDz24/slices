import { SigninRequestDto } from './dto/signin.request.dto';

export class SigninCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}

  static fromBody(body: SigninRequestDto): SigninCommand {
    return new SigninCommand(body.email, body.password);
  }
}
