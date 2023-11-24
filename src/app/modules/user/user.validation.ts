import { z } from 'zod';

const userFullNameSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(1).max(20),
});

const userAddressSchema = z.object({
  street: z.string(),
  city: z.string().min(1),
  country: z.string().min(1),
});

const orderSchema = z.object({
  productName: z.string().min(1),
  price: z.number(),
  quantity: z.number(),
});

export const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().min(1).max(20),
  password: z.string().min(8).max(20),
  fullName: userFullNameSchema,
  age: z.number(),
  email: z.string().min(1).email('Email is not valid'),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()).min(1),
  address: userAddressSchema,
  //   orders: z.array(orderSchema),
});
