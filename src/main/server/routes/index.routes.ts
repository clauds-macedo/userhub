import { Request, Response, Router } from 'express';
import { authRouter } from './auth.routes';

export const MainRouter = Router();

MainRouter.get('/', async (req: Request, res: Response) => {
  res.json({ message: 'Hello World' });
});

MainRouter.use('/auth', authRouter);
