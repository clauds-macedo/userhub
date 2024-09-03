import { connectToDatabase } from '@/infra/config/mongoose';
import dotenv from 'dotenv';
import express from 'express';
import { MainRouter } from './routes/index.routes';

dotenv.config();

const app: express.Server = express();
const PORT = process.env.PORT || 3333;

app.use('/', MainRouter);

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`🔥 Server is running on port ${PORT}`);
});
