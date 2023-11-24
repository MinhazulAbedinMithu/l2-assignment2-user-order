import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    title: 'Users Order',
    description: 'Programming hero level 2 assignment 02',
  });
});

export default app;
