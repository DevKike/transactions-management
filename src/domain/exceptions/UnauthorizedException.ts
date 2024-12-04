import { HttpStatusCode } from '../enums/HttpStatusCode';
import { BaseException } from './BaseException';

export class UnauthorizedException extends BaseException {
  constructor(message: string) {
    super(message, HttpStatusCode.UNAUTHORIZED);
    this.name = 'UnauthorizedException';
  }
}
