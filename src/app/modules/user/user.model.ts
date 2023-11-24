import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  IUserModel,
  TOrder,
  TUser,
  TUserAddress,
  TUserFullName,
} from './user.instance';
import config from '../../config';

const userFullNameSchema = new Schema<TUserFullName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    maxlength: [20, 'firstname must be lower than 20 characters'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'First name is required'],
    maxlength: [20, 'firstname must be lower than 20 characters'],
    trim: true,
  },
});
const userAddressSchema = new Schema<TUserAddress>({
  street: {
    type: String,
  },
  city: {
    type: String,
    required: [true, 'city is required'],
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
  },
});

const orderSchema = new Schema<TOrder>({
  productName: {
    type: String,
    required: [true, 'Product Name is Required'],
  },
  price: {
    type: Number,
    required: [true, 'Product Name is Required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Product Name is Required'],
  },
});

const userSchema = new Schema<TUser, IUserModel>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'User Id required'],
  },
  username: {
    type: String,
    required: [true, 'Username Required'],
    maxlength: [20, 'Max Length is 20'],
  },
  password: {
    type: String,
    required: [true, 'Username Required'],
    maxlength: [20, 'Max Length is 20 charecters'],
    minlength: [8, 'Max Length is 8 charecters'],
  },
  fullName: {
    type: userFullNameSchema,
    required: [true, 'Fullname is required'],
  },
  age: {
    type: Number,
    required: [true, 'Age is Required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
    required: true,
  },
  address: {
    type: userAddressSchema,
    required: [true, 'Address is Required'],
  },
  orders: {
    type: [orderSchema],
  },
});

userSchema.statics.isUserExist = async function (id: number) {
  const existUser = await UserModel.findOne(
    { userId: id },
    { password: 0, _id: 0 },
  );
  return existUser;
};

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

export const UserModel = model<TUser, IUserModel>('User', userSchema);
