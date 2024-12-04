import { Response } from 'express';
import { HttpStatusCode } from '../../../domain/enums/HttpStatusCode';
import { Message } from '../../../domain/enums/Message';
import { BaseException } from '../../../domain/exceptions/BaseException';

export class ResponseModel {
  static async manageResponse(
    promise: Promise<any>,
    res: Response,
    statusCode: HttpStatusCode = HttpStatusCode.OK,
    message: string = Message.SUCCESS
  ) {
    try {
      const result = await promise;
      const response = {
        message,
        data: result,
      };
      res.status(statusCode).json(response);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  private static handleError(error: unknown, res: Response) {
    const errorResponse = {
      message: Message.INTERNAL_SERVER_ERROR,
    };

    if (error instanceof BaseException) {
      errorResponse.message = error.message as Message;
      return res.status(error.statusCode).json({ ...errorResponse });
    }

    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ ...errorResponse });
  }
}
