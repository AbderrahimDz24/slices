import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SigninRequestDto } from './dto/signin.request.dto';
import { SigninResponseDto } from './dto/signin.response.dto';
import { SigninCommand } from './signin.command';
import { ApiTags } from '@nestjs/swagger';
import { SigninDocs } from './signin.docs';
import { Public } from '../../decorators';
import { Mediator } from '@core/cqrs';

@ApiTags('users')
@Controller('users')
export class SigninController {
  constructor(private readonly mediator: Mediator) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @Public()
  @SigninDocs()
  async signIn(@Body() dto: SigninRequestDto): Promise<SigninResponseDto> {
    const command = SigninCommand.fromBody(dto);
    return this.mediator.command(command);
  }
}
