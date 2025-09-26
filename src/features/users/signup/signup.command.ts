import { SignupRequestDto } from './dto/signup.request.dto';

export class SignupCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}

  static fromBody(body: SignupRequestDto): SignupCommand {
    return new SignupCommand(body.email, body.password);
  }
}
