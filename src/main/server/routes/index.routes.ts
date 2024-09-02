import { Request, Response, Router } from 'express';

export const MainRouter = Router();

MainRouter.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World' });
});
