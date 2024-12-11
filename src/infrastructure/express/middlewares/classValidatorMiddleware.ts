import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../../../domain/enums/HttpStatusCode';
import { ResponseModel } from '../response/ResponseModel';

export const classValidatorMiddleware = (DtoClass: any) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const dtoInstance = Object.assign(new DtoClass(), req.body);
      await validate(dtoInstance);
      next();
    } catch (error) {
      ResponseModel.handleError(error, res);
    }
  };
};
