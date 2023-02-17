import { Document, model, Schema } from 'mongoose';

type AccountType = 'client' | 'seller';

export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image: string;
  accountType: AccountType;
}

const UserSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  accountType: {
    type: String,
    required: true,
  },
});

const User = model<IUser>('User', UserSchema);

export default User;
