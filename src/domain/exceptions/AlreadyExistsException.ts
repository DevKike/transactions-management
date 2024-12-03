export class AlreadyExistException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AlreadyExistException';
  }
}
