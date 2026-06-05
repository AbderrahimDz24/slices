import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActiveUser, Roles } from '@auth/decorators';
import type { ActiveUserData } from '@auth/common';
import { UserRoles } from '@common/enums';
import { Mediator } from '@core/cqrs';
import { CreateDepositCommand } from './create-deposit.command';
import { CreateDepositDocs } from './create-deposit.docs';
import { CreateDepositRequestDto } from './dtos/create-deposit.request.dto';
import { CreateDepositResponseDto } from './dtos/create-deposit.response.dto';

@ApiTags('admin')
@Controller('admin/users/:userId/deposits')
export class CreateDepositController {
  constructor(private readonly mediator: Mediator) {}

  @Post()
  @Roles(UserRoles.OWNER)
  @CreateDepositDocs()
  async createDeposit(
    @Param('userId') userId: string,
    @ActiveUser() activeUser: ActiveUserData,
    @Body() dto: CreateDepositRequestDto,
  ): Promise<CreateDepositResponseDto> {
    const command = CreateDepositCommand.fromBody(userId, activeUser.sub, dto);
    return this.mediator.command(command);
  }
}
