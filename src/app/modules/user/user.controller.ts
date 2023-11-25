import { Request, Response } from 'express';
import { userValidationSchema } from './user.validation';
import { TOrder, TUser } from './user.instance';
import { userServices } from './user.service';
import { catchErrorHandler } from './user.error';

// Create User
const createUser = async (req: Request, res: Response) => {
  try {
    const userData: TUser = req.body;
    const zodParsedData = userValidationSchema.parse(userData);
    const result = await userServices.createUser(zodParsedData);
    if (!result) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong',
      });
    }
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err: any) {
    catchErrorHandler(err, res);
  }
};

// Get All Users
const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUsers();
    if (!result) {
      return res.status(500).json({
        success: false,
        message: 'Users not found !!!',
        error: {
          code: 500,
          description: result,
        },
      });
    }
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    catchErrorHandler(err, res);
  }
};

// Get Single User
const getUser = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId;
    const result = await userServices.getUser(Number(userId));
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    catchErrorHandler(err, res);
  }
};

// Update Single User
const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userData: TUser = req.body;
    if (Number(userId) !== userData.userId) {
      return res.status(300).json({
        success: false,
        message: 'Please give correct User id',
      });
    }
    const zodParsedData = userValidationSchema.parse(userData);
    const result = await userServices.updateUser(zodParsedData);

    return res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err: any) {
    catchErrorHandler(err, res);
  }
};

// Delete Single User
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId;
    await userServices.deleteUser(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (err: any) {
    catchErrorHandler(err, res);
  }
};

// ***** Orders Part ******

// Add new Order
const addOrder = async (req: Request, res: Response) => {
  try {
    const orderData: TOrder = req.body;
    const userId: number = Number(req.params.userId);
    const result = await userServices.addOrder(userId, orderData);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (err: any) {
    catchErrorHandler(err, res);
  }
};

// Get All Orders
const getOrders = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await userServices.getOrders(userId);
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    catchErrorHandler(err, res);
  }
};

// Calculate Total price of orders
const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await userServices.getTotalPrice(userId);
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: result,
      },
    });
  } catch (err: any) {
    catchErrorHandler(err, res);
  }
};

export const userControllers = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addOrder,
  getOrders,
  getTotalPrice,
};
