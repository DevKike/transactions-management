import { HttpStatusCode } from '../enums/HttpStatusCode';
import { BaseException } from './BaseException';

export class AlreadyExistException extends BaseException {
  constructor(message: string) {
    super(message, HttpStatusCode.CONFLICT);
    this.name = 'AlreadyExistException';
  }
}
