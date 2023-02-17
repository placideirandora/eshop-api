import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { environment } from '../config/environment';

export interface IGenerateToken {
  id: string;
  firstName: string;
  lastName: string;
  accountType: string;
}

class AuthHelper {
  generateToken({ id, firstName, lastName, accountType }: IGenerateToken) {
    return jwt.sign(
      {
        id,
        firstName,
        lastName,
        accountType,
      },
      environment.jwtSecretKey,
      { expiresIn: '30d' }
    );
  }

  hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  compareHashedPasswords(
    unHashedPassword: string,
    hashedPassword: string
  ): boolean {
    return bcrypt.compareSync(unHashedPassword, hashedPassword);
  }
}

export default new AuthHelper();
