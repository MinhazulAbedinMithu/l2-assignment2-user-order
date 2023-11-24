import { Request, Response } from 'express';
import { userValidationSchema } from './user.validation';
import { TUser } from './user.instance';
import { userServices } from './user.service';

// Create User
const createUser = async (req: Request, res: Response) => {
  try {
    //get user data
    const userData: TUser = req.body;
    const zodParsedData = userValidationSchema.parse(userData);
    const result = await userServices.createUser(zodParsedData);
    // delete result.password;
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
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 500,
        description: err[0]?.message || err?.message,
      },
    });
  }
};

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
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 500,
        description: err[0]?.message || err?.message,
      },
    });
  }
};

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
    res.status(404).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 404,
        description: err[0]?.message || err?.message,
      },
    });
  }
};
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
    res.status(404).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 404,
        description: err[0]?.message || err?.message,
      },
    });
  }
};

export const userControllers = {
  createUser,
  getUsers,
  getUser,
  updateUser,
};
