import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('App is Alive');
});
app.get('/about', (req, res) => {
  res.status(200).json({
    title: 'Users Order',
    description: 'Programming hero level 2 assignment 02',
  });
});

export default app;
