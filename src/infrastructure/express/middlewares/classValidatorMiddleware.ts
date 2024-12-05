import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../../../domain/enums/HttpStatusCode';

export const classValidatorMiddleware = (DtoClass: any) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const dtoInstance = Object.assign(new DtoClass(), req.body);

    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: 'Validation failed',
        error: errors,
      });
    } else {
      next();
    }
  };
};
