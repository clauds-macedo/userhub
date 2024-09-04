import { connectToDatabase } from '@/infra/config/mongoose';
import dotenv from 'dotenv';
import express from 'express';
import { setupSwagger } from '../docs/swagger';
import { MainRouter } from './routes/index.routes';

dotenv.config();

const app = express();
setupSwagger(app);

const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use('/', MainRouter);

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`🔥 Server is running on port ${PORT}`);
});
