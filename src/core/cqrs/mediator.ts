import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus, ICommand, IQuery } from '@nestjs/cqrs';

@Injectable()
export class Mediator {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
   * Dispatches a command to its handler.
   * @param command The command to dispatch.
   * @returns The result of the command handler.
   */
  public command<T extends ICommand, U = any>(command: T): Promise<U> {
    return this.commandBus.execute<T, U>(command);
  }

  /**
   * Dispatches a query to its handler.
   * @param query The query to dispatch.
   * @returns The result of the query handler.
   */
  public query<T extends IQuery, U = any>(query: T): Promise<U> {
    return this.queryBus.execute<T, U>(query);
  }
}
