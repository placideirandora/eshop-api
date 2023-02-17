import { Request, Response } from 'express';
import { STATUS_CODES } from '../../constants';
import { IUser } from '../../data/user.model';

import authHelper from '../../helpers/auth.helper';
import { ResponseHandler } from '../../helpers/response.helper';
import userHelper from '../../helpers/user.helper';
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

  static async signInUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body as IUser;

      const user = await userService.findUserByEmail(email);
      const isPasswordCorrect = authHelper.compareHashedPasswords(
        password,
        user.password
      );

      if (!isPasswordCorrect) {
        return ResponseHandler.sendResponse(
          res,
          STATUS_CODES.UNAUTHORIZED,
          'Invalid credentials'
        );
      }

      const { _id, firstName, lastName, accountType } = user;

      const token = authHelper.generateToken({
        id: _id,
        firstName,
        lastName,
        accountType,
      });

      return ResponseHandler.sendResponse(res, STATUS_CODES.OK, 'Signed In', {
        token,
        ...userHelper.getUserDataWithoutSensitiveInfo(user),
      });
    } catch (error) {
      return ResponseHandler.sendErrorResponse(res, error);
    }
  }
}
