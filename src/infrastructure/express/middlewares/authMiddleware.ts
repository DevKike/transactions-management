import { IJwtService } from '../../jwt/interfaces/IJwtService';
import { IRequest } from '../interfaces/IRequest';
import { NextFunction, Response } from 'express';
import { handleJwtError } from '../handlers/handleJwtError';
import { TokenUtils } from '../../utils/TokenUtils';
import { container } from '../../inversify/config/inversify.config';
import { TYPES } from '../../inversify/types/types';

export const authMiddleware = () => {
  const authService = container.get<IJwtService>(TYPES.AuthService);

  return async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const token = TokenUtils.extract(req.headers.authorization);
      const payload = authService.verifyToken(token);
      req.user = payload;
      next();
    } catch (error) {
      handleJwtError(error, res);
    }
  };
};
