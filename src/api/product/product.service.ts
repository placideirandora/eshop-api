import Product, { IProduct } from '../../data/product.model';

class ProductService {
  async findProductById(id: string): Promise<IProduct | null> {
    const product = await Product.findOne({ _id: id })
      .populate('seller')
      .exec();
    return product;
  }

  async createProduct(product: IProduct): Promise<IProduct> {
    const createdProduct = await Product.create(product);
    return createdProduct;
  }

  async getProducts(): Promise<IProduct[] | []> {
    const products = await Product.find()
      .sort({ title: -1 })
      .populate('seller')
      .exec();
    return products;
  }
}

export default new ProductService();
