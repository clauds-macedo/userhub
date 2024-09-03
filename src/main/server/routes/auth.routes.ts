import { create, login } from '@/main/controllers/AuthenticationController';
import { Router } from 'express';

export const authRouter = Router();

authRouter.post('/register', create);
authRouter.post('/login', login);
