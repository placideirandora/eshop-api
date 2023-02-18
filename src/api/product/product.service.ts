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

  async getProducts(
    page: number,
    limit: number
  ): Promise<{
    docs: IProduct[];
    total: number;
    totalPages: number;
  }> {
    const options = {
      page: page,
      limit: limit,
      sort: { name: 1 },
      populate: {
        path: 'seller',
        select: '_id firstName lastName',
      },
    };
    const { docs, total, totalPages } = await Product.paginate({}, options);
    return { docs, total, totalPages };
  }
}

export default new ProductService();
