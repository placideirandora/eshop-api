import { Router } from 'express';

import { AuthController } from './auth.controller';
import { validate } from '../../middleware/requestValidation.middleware';
import userHelper from '../../helpers/user.helper';

export const authRouter = Router();

authRouter.post(
  '/signup',
  validate(userHelper.createUserRule()),
  AuthController.registerUser
);

authRouter.post(
  '/signin',
  validate(userHelper.signInUserRule()),
  AuthController.signInUser
);
