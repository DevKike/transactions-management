import { error } from 'console';
import { NextFunction, Request, Response } from 'express';

interface ICustomError extends Error {
  statusCode?: number;
  code?: string;
  errors?: any[];
}

export const errorMiddleware = (
  err: ICustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;

  const response = {
    message: err.message || 'Something went wrong',
    error: err.errors,
  };

  res.status(statusCode).json(response);
};
