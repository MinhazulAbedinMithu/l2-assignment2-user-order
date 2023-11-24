import { TUser } from './user.instance';
import { UserModel } from './user.model';

const createUser = async (userData: TUser) => {
  if (await UserModel.isUserExist(userData.userId)) {
    throw new Error('User Already Exist');
  }
  const result = await UserModel.create(userData);
  const { password, ...rest } = result.toObject();
  return rest;
};
const getUsers = async () => {
  const result = await UserModel.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 },
  );
  return result;
};

const getUser = async (userId: number) => {
  const existUser = await UserModel.isUserExist(userId);
  //   if (!existUser) {
  //     throw new Error('User not found!');
  //   }
  return existUser;
};

const updateUser = async (userData: TUser) => {
  const existUser = await UserModel.isUserExist(userData.userId);
  if (!existUser) {
    throw new Error('User not found');
  }
  const isUpdated = await UserModel.updateOne(
    { userId: userData.userId },
    { $set: userData },
  );
  const { password, ...rest } = userData;

  return isUpdated ? { ...rest } : isUpdated;
};

export const userServices = {
  createUser,
  getUsers,
  getUser,
  updateUser,
};
