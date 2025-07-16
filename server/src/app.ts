import express from 'express';
import { connectToDatabase } from './db';
const app = express();
const PORT = process.env.PORT || 3000;
const connectionToDatabase = connectToDatabase();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  
});
