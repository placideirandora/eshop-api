import mongoosePaginate from 'mongoose-paginate-v2';
import { Document, Model, model, Schema, Types } from 'mongoose';

type ProductCategory =
  | 'Electronics'
  | 'Clothing'
  | 'Beauty'
  | 'Sports & Outdoors'
  | 'Home & Kitchen'
  | 'Toys & Games';

export interface IProduct extends Document {
  _id: string;
  name: string;
  price: number;
  shortDescription: string;
  category: ProductCategory;
  image: string;
  manufacturingDate: string;
  seller: Types.ObjectId;
}

interface IProductModel extends Model<IProduct & Document> {
  paginate(query?: any, options?: any): Promise<any>;
}

const ProductSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  manufacturingDate: {
    type: Date,
    required: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

ProductSchema.plugin(mongoosePaginate);

const Product: IProductModel = model<IProduct, IProductModel>(
  'Product',
  ProductSchema
);

export default Product;
