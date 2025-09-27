import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Mediator } from '../../../core/cqrs/mediator';
import { Public } from '../../../core/auth/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { RefreshTokenDocs } from './refresh-token.docs';
import { RefreshTokenRequestDto } from './refresh-token.request.dto';
import { RefreshTokenCommand } from './refresh-token.command';
import { SigninResponseDto } from '../signin/dto/signin.response.dto';

@ApiTags('users')
@Controller('users')
export class RefreshTokenController {
  constructor(private readonly mediator: Mediator) {}

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @Public()
  @RefreshTokenDocs()
  async refresh(
    @Body() dto: RefreshTokenRequestDto,
  ): Promise<SigninResponseDto> {
    const command = RefreshTokenCommand.fromBody(dto);
    return this.mediator.command(command);
  }
}
