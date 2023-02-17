import { body } from 'express-validator';
import userService from '../api/user/user.service';

class UserHelper {
  createUserRule() {
    return [
      body('firstName', 'firstName is required').notEmpty(),
      body('lastName', 'lastName is required').notEmpty(),
      body('email').isEmail().withMessage('Invalid email').notEmpty(),
      body('email').custom(async (email) => {
        const user = await userService.findUserByEmail(email);
        if (user) {
          return Promise.reject('User with the same email already exists');
        }
        return true;
      }),
      body('password', 'password is required').notEmpty(),
      body('accountType', 'acountType is required').notEmpty(),
    ];
  }
}

export default new UserHelper();
