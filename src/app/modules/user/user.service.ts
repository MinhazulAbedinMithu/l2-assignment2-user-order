import { TOrder, TUser } from './user.instance';
import { UserModel } from './user.model';

// Create User
const createUser = async (userData: TUser) => {
  if (await UserModel.isUserExist(userData.userId)) {
    throw new Error('User Already Exist');
  }
  const result = await UserModel.create(userData);
  const { password, ...rest } = result.toObject();
  return rest;
};

// Get All Users
const getUsers = async () => {
  const result = await UserModel.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 },
  );
  return result;
};

// Get Single User
const getUser = async (userId: number) => {
  const existUser = await UserModel.isUserExist(userId);
  return existUser;
};

// Update Single User
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

// Delete Single User
const deleteUser = async (userId: number) => {
  const existUser = await UserModel.isUserExist(userId);
  if (!existUser) {
    throw new Error('User not found');
  }
  const result = await UserModel.updateOne({ userId }, { isDeleted: true });
  return result;
};

// Add New Order
const addOrder = async (userId: number, orderData: TOrder) => {
  const existUser = await UserModel.isUserExist(userId);
  if (!existUser) {
    throw new Error('User not found');
  }
  const result = await UserModel.updateOne(
    { userId },
    {
      $addToSet: { orders: orderData },
    },
  );
  return result;
};

// Get All Orders
const getOrders = async (userId: number) => {
  const existUser = await UserModel.isUserExist(userId);
  if (!existUser) {
    throw new Error('User not found');
  }
  const result = await UserModel.findOne({ userId }, { orders: 1 });
  return result;
};

// Get Total Price
const getTotalPrice = async (userId: number) => {
  const existUser = await UserModel.isUserExist(userId);
  if (!existUser) {
    throw new Error('User not found');
  }
  const result = await UserModel.aggregate([
    // stage-1: get specific user
    {
      $match: { userId },
    },
    {
      $unwind: '$orders',
    },

    //stage-3: calculate individual order details
    {
      $project: {
        total: {
          $multiply: ['$orders.price', '$orders.quantity'],
        },
      },
    },

    //stage-4: Now Calculate grand total of all Orders
    {
      $group: {
        _id: null,
        totalPrice: { $sum: '$total' },
      },
    },
  ]);

  return result[0].totalPrice;
};

export const userServices = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addOrder,
  getOrders,
  getTotalPrice,
};
