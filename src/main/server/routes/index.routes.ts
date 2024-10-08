import { Request, Response, Router } from 'express';
import { AddressRouter } from './address.routes';
import { AuthRouter } from './auth.routes';
import { UserRouter } from './user.routes';

export const MainRouter = Router();

MainRouter.get('/', async (req: Request, res: Response) => {
  res.json({ message: 'Hello World' });
});

MainRouter.use('/auth', AuthRouter);
MainRouter.use('/user', UserRouter);
MainRouter.use('/address', AddressRouter);
