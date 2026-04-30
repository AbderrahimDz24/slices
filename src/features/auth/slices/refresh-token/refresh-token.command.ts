import { ICommand } from '@nestjs/cqrs';
import { RefreshTokenRequestDto } from './dtos/refresh-token.request.dto';

export class RefreshTokenCommand implements ICommand {
  constructor(public readonly refreshToken: string) {}

  static fromBody(dto: RefreshTokenRequestDto): RefreshTokenCommand {
    return new RefreshTokenCommand(dto.refreshToken);
  }
}
