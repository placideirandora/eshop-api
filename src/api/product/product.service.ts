import Product, { IProduct } from '../../data/product.model';

class ProductService {
  async findProductById(id: string): Promise<IProduct | null> {
    const product = await Product.findOne({ _id: id })
      .populate({
        path: 'seller',
        select: '_id firstName lastName',
      })
      .exec();
    return product;
  }

  async createProduct(product: IProduct): Promise<IProduct> {
    const createdProduct = await Product.create(product);
    return createdProduct;
  }

  async getProducts(): Promise<IProduct[] | []> {
    const products = await Product.find()
      .sort({ name: -1 })
      .populate({
        path: 'seller',
        select: '_id firstName lastName',
      })
      .exec();
    return products;
  }
}

export default new ProductService();
