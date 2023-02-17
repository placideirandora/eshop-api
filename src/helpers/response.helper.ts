import { Response } from 'express';

import { STATUS_CODES } from '../constants';

export class ResponseHandler {
  static sendResponse(
    res: Response,
    statusCode: number,
    message: string,
    data?: object
  ) {
    return res.status(statusCode).json({
      message,
      data,
    });
  }

  static sendErrorResponse(res: Response, errorInstance: IError) {
    const { message, error, statusCode } = errorInstance;
    const code = statusCode || STATUS_CODES.SERVER_ERROR;
    return res.status(code).json({
      message,
      error,
    });
  }
}

export interface IError {
  message?: string;
  statusCode?: number;
  error?: Error;
}
