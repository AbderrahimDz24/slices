import { Body, Controller, Post } from '@nestjs/common';
import { Mediator } from '../../../core/cqrs/mediator';
import { SignupRequestDto } from './dto/signup.request.dto';
import { SignupResponseDto } from './dto/signup.response.dto';
import { SignupCommand } from './signup.command';
import { Public } from '../../../core/auth/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { SignupDocs } from './signup.docs';

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
