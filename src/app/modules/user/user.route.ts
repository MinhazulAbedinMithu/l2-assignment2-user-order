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
  .put(userControllers.updateUser);

export const userRoutes = router;
