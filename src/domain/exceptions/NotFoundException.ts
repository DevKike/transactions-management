import { HttpStatusCode } from '../enums/HttpStatusCode';
import { BaseException } from './BaseException';

export class NotFoundException extends BaseException {
  constructor(message: string) {
    super(message, HttpStatusCode.NOT_FOUND);
    this.name = 'NotFoundException';
  }
}
