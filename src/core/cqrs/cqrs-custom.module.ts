import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Mediator } from './mediator';

@Module({
  imports: [CqrsModule.forRoot()],
  providers: [Mediator],
  exports: [Mediator],
})
export class CqrsCustomModule {}
