import { HttpStatusCode } from '../enums/HttpStatusCode';

export class BaseException extends Error {
  constructor(
    message: string,
    public readonly statusCode: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}
