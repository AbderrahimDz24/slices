import { Module } from '@nestjs/common';
import { TransactionsCoreModule } from '@transactions/core';
import { CreateMobileTopupController } from './create-mobile-topup.controller';
import { CreateMobileTopupHandler } from './create-mobile-topup.handler';

@Module({
  imports: [TransactionsCoreModule],
  controllers: [CreateMobileTopupController],
  providers: [CreateMobileTopupHandler],
})
export class CreateMobileTopupModule {}
