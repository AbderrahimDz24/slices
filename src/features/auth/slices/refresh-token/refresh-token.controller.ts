import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RefreshTokenDocs } from './refresh-token.docs';
import { RefreshTokenRequestDto } from './dtos/refresh-token.request.dto';
import { RefreshTokenCommand } from './refresh-token.command';
import { SigninResponseDto } from '@auth/dtos';
import { Mediator } from '@core/cqrs';
import { Public } from '@auth/decorators';

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
