// app.ts
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users/userRoutes';
import bugRoutes from './routes/bugs/bugRoutes';
import { connectToDatabase } from './db';

const app = express();
const PORT = process.env.PORT || 3000;

const main = async () => {
  await connectToDatabase(); // ensure pool is initialized
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());

  app.use('/api/users', userRoutes);
  app.use('/api/bugs', bugRoutes);

  app.get('/', (_, res) => res.send('Welcome to the Bug Tracker API'));

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
