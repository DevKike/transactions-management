import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { ResponseModel } from '../response/ResponseModel';

export const classValidatorMiddleware = (DtoClass: any) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const dtoInstance = Object.assign(new DtoClass(), req.body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      ResponseModel.handleError(errors[0], res);
      return;
    }
    next();
  };
};
