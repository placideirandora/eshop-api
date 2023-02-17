import { Router } from 'express';

import { ProductController } from './product.controller';
import productHelper from '../../helpers/product.helper';
import { validate } from '../../middleware/requestValidation.middleware';

export const productRouter = Router();

productRouter.post(
  '/add',
  validate(productHelper.createProductRule()),
  ProductController.createProduct
);
