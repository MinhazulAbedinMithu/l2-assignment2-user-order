import { Response } from 'express';

export const catchErrorHandler = (err: any, res: Response) => {
  return res.status(500).json({
    success: false,
    message: 'Something went wrong',
    error: {
      code: 500,
      description: err[0]?.message || err?.message,
    },
  });
};
