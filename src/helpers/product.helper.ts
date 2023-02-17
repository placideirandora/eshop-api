import { Types } from 'mongoose';
import { body } from 'express-validator';

import userService from '../api/user/user.service';

class ProductHelper {
  createProductRule() {
    return [
      body('name').exists().withMessage('name is required').notEmpty(),
      body('price')
        .exists()
        .withMessage('price is required')
        .isNumeric()
        .withMessage('Price must be a number'),
      body('shortDescription')
        .exists()
        .withMessage('shortDescription is required')
        .notEmpty(),
      body('category').exists().withMessage('category is required').notEmpty(),
      body('image').exists().withMessage('image is required').notEmpty(),
      body('manufacturingDate')
        .exists()
        .withMessage('manufacturingDate is required')
        .isDate()
        .withMessage('Invalid date'),
      body('seller').exists().withMessage('seller id is required').notEmpty(),
      body('seller').custom(async (userId) => {
        if (!Types.ObjectId.isValid(userId)) {
          return Promise.reject('Invalid MongoDB ID for seller');
        }
        const user = await userService.findUserById(userId);
        if (!user) {
          return Promise.reject('Seller with the provided ID does not exist');
        }
        return true;
      }),
    ];
  }

  transformReturnedProduct(product) {
    const {
      _id,
      name,
      price,
      category,
      manufacturingDate,
      shortDescription,
      image,
      seller,
    } = product;
    return {
      id: _id,
      name,
      price,
      category,
      manufacturingDate,
      shortDescription,
      image,
      seller,
    };
  }
}

export default new ProductHelper();
