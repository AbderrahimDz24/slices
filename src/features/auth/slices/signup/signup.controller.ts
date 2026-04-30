import { Body, Controller, Post } from '@nestjs/common';
import { SignupRequestDto } from './dtos/signup.request.dto';
import { SignupResponseDto } from './dtos/signup.response.dto';
import { SignupCommand } from './signup.command';
import { ApiTags } from '@nestjs/swagger';
import { SignupDocs } from './signup.docs';
import { Mediator } from '@core/cqrs';
import { Public } from '@auth/decorators';

@ApiTags('users')
@Controller('users')
export class SignupController {
  constructor(private readonly mediator: Mediator) {}

  @Post('signup')
  @Public()
  @SignupDocs()
  async signUp(@Body() dto: SignupRequestDto): Promise<SignupResponseDto> {
    const command = SignupCommand.fromBody(dto);
    return this.mediator.command(command);
  }
}
