export class DeleteProductCommand {
  id: number;

  static from(id: number): DeleteProductCommand {
    const command = new DeleteProductCommand();
    command.id = id;
    return command;
  }
}
