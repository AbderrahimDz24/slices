export class DeleteProductCommand {
  id: string;

  static from(id: string): DeleteProductCommand {
    const command = new DeleteProductCommand();
    command.id = id;
    return command;
  }
}
