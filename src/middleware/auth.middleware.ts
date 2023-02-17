import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { STATUS_CODES } from '../constants';
import { environment } from '../config/environment';
import { IGenerateToken } from '../helpers/auth.helper';
import { ResponseHandler } from '../helpers/response.helper';

export class AuthMiddleware {
  static async verifyToken(
    req: Request | any,
    res: Response,
    next: NextFunction
  ) {
    const token: string = req.headers.authorization;

    if (!token) {
      const errorPayload = {
        message: 'Unauthorized. Provide the bearer token',
        statusCode: STATUS_CODES.UNAUTHORIZED,
      };
      return ResponseHandler.sendErrorResponse(res, errorPayload);
    }

    jwt.verify(
      token.split(' ')[1],
      environment.jwtSecretKey,
      async (error: jwt.VerifyErrors, decoded: IGenerateToken) => {
        const errorPayload = {
          message: 'Unauthorized. Invalid token',
          statusCode: STATUS_CODES.UNAUTHORIZED,
          error,
        };

        if (error) {
          return ResponseHandler.sendErrorResponse(res, errorPayload);
        }

        req.userInfo = decoded;
        next();
      }
    );
  }
}
