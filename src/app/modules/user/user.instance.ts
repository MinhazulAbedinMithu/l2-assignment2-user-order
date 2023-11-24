import { Model } from 'mongoose';

export type TUserFullName = {
  firstName: string;
  lastName: string;
};
export type TUserAddress = {
  street?: string;
  city: string;
  country: string;
};
export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};
export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TUserFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TUserAddress;
  orders?: TOrder[];
};

export interface IUserModel extends Model<TUser> {
  isUserExist(id: number): Promise<TUser | null>;
}
