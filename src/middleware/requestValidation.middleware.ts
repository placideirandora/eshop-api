import { Request, Response, NextFunction } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

import { STATUS_CODES } from '../constants';
import { ResponseHandler } from '../helpers/response.helper';

export function validate(validations: ValidationChain[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors: any = [];
    
    errors.array().map((err) => extractedErrors.push(err.msg));

    const message =
      'Some validations could not be met. Check the below response and resolve any issues';
    return ResponseHandler.sendResponse(
      res,
      STATUS_CODES.BAD_REQUEST,
      message,
      {
        errors: extractedErrors,
      }
    );
  };
}
