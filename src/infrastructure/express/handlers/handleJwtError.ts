import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { UnauthorizedException } from '../../../domain/exceptions/UnauthorizedException';
import { Response } from 'express';
import { ResponseModel } from '../response/ResponseModel';

export const handleJwtError = (error: unknown, res: Response): void => {
  let exception: UnauthorizedException;

  if (error instanceof TokenExpiredError) {
    exception = new UnauthorizedException('Token has expired');
  }

  if (error instanceof JsonWebTokenError) {
    exception = new UnauthorizedException('Invalid token format');
  } else {
    exception = new UnauthorizedException('Authentication failed');
  }

  ResponseModel.handleError(exception, res);
};
