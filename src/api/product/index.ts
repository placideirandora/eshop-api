import { Router } from 'express';

import { ProductController } from './product.controller';
import productHelper from '../../helpers/product.helper';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/requestValidation.middleware';

export const productRouter = Router();

productRouter.post(
  '/add',
  AuthMiddleware.verifyToken,
  validate(productHelper.createProductRule()),
  ProductController.createProduct
);

productRouter.get(
  '/',
  AuthMiddleware.verifyToken,
  ProductController.getProducts
);
