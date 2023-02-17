import { body } from 'express-validator';

import userService from '../api/user/user.service';

class UserHelper {
  createUserRule() {
    return [
      body('firstName', 'firstName is required').notEmpty(),
      body('lastName', 'lastName is required').notEmpty(),
      body('email').isEmail().withMessage('Invalid email').notEmpty(),
      body('password', 'password is required').notEmpty(),
      body('accountType', 'acountType is required').notEmpty(),
    ];
  }

  signInUserRule() {
    return [
      body('email').isEmail().withMessage('Invalid email').notEmpty(),
      body('password', 'password is required').notEmpty(),
    ];
  }

  getUserDataWithoutSensitiveInfo(user) {
    const { _id, firstName, lastName, email, accountType } = user;
    return {
      id: _id,
      firstName,
      lastName,
      email,
      accountType,
    };
  }
}

export default new UserHelper();
