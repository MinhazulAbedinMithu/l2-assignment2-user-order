import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router
  .route('/')
  .post(userControllers.createUser)
  .get(userControllers.getUsers);

router
  .route('/:userId')
  .get(userControllers.getUser)
  .put(userControllers.updateUser)
  .delete(userControllers.deleteUser);

router
  .route('/:userId/orders')
  .put(userControllers.addOrder)
  .get(userControllers.getOrders);

router.get('/:userId/orders/total-price', userControllers.getTotalPrice);

export const userRoutes = router;
