import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Mediator } from '../../../core/cqrs/mediator';
import { SigninRequestDto } from './dto/signin.request.dto';
import { SigninResponseDto } from './dto/signin.response.dto';
import { SigninCommand } from './signin.command';
import { Public } from '../../../core/auth/public.decorator';

@Controller('users')
export class SigninController {
  constructor(private readonly mediator: Mediator) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @Public()
  async signIn(@Body() dto: SigninRequestDto): Promise<SigninResponseDto> {
    const command = SigninCommand.fromBody(dto);
    return this.mediator.command(command);
  }
}
