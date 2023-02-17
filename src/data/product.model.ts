import { Document, model, Schema, Types } from 'mongoose';

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

const Product = model<IProduct>('Product', ProductSchema);

export default Product;
