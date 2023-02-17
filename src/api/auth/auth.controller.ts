import { Request, Response } from 'express';
import { STATUS_CODES } from '../../constants';
import { IUser } from '../../data/user.model';

import authHelper from '../../helpers/auth.helper';
import { ResponseHandler } from '../../helpers/response.helper';
import userService from '../user/user.service';

export class AuthController {
  static async registerUser(req: Request, res: Response) {
    try {
      const { password } = req.body as IUser;
      const hashedPassword = authHelper.hashPassword(password);
      req.body.password = hashedPassword;

      const user = await userService.createUser(req.body);
      delete user.password;

      return ResponseHandler.sendResponse(
        res,
        STATUS_CODES.CREATED,
        'User registered. You can now sign into your account'
      );
    } catch (error) {
      return ResponseHandler.sendErrorResponse(res, error);
    }
  }
}
