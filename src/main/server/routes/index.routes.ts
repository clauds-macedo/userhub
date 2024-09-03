import { MongooseUserRepository } from '@/infra/repositories/MongooseUserRepository';
import { Request, Response, Router } from 'express';

export const MainRouter = Router();

MainRouter.get('/', async (req: Request, res: Response) => {
  const all = await new MongooseUserRepository().findById(
    '66d686c80c3070e4939a30f6'
  );
  console.log(all);
  res.json({ message: 'Hello World' });
});
