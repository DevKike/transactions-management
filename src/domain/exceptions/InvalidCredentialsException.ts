import { HttpStatusCode } from '../enums/HttpStatusCode';
import { BaseException } from './BaseException';

export class InvalidCredentialsException extends BaseException {
  constructor(message: string) {
    super(message, HttpStatusCode.UNAUTHORIZED);
    this.name = 'InvalidCredentialsException';
  }
}
