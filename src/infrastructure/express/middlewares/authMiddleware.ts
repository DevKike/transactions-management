import { IRequest } from '../interfaces/IRequest';
import { NextFunction, Response } from 'express';
import { UnauthorizedException } from '../../../domain/exceptions/UnauthorizedException';
import { container } from '../../inversify/config/inversify.config';
import { IJwtService } from '../../jwt/interfaces/IJwtService';
import { TYPES } from '../../inversify/types/types';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export const authMiddleware = async () => {
  const jwtService = container.get<IJwtService>(TYPES.AuthService);

  return async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException('Token not provided');
      }

      const decoded = jwtService.verifyToken(token);

      req.user = decoded;

      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token has expired');
      } else if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid token');
      } else {
        throw new UnauthorizedException('Authentication error');
      }
    }
  };
};
