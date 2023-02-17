import { Request, Response } from 'express';

import { STATUS_CODES } from '../../constants';
import productService from './product.service';
import productHelper from '../../helpers/product.helper';
import { ResponseHandler } from '../../helpers/response.helper';

export class ProductController {
  static async createProduct(req: Request, res: Response) {
    try {
      const product = await productService.createProduct(req.body);

      return ResponseHandler.sendResponse(
        res,
        STATUS_CODES.CREATED,
        'Product created',
        { ...productHelper.transformReturnedProduct(product) }
      );
    } catch (error) {
      return ResponseHandler.sendErrorResponse(res, error);
    }
  }

  static async getProducts(req: Request, res: Response) {
    try {
      const products = await productService.getProducts();
      const transformedProducts = products.map((product) =>
        productHelper.transformReturnedProduct(product)
      );

      return ResponseHandler.sendResponse(
        res,
        STATUS_CODES.OK,
        'Products retrieved',
        { products: transformedProducts }
      );
    } catch (error) {
      return ResponseHandler.sendErrorResponse(res, error);
    }
  }
}
