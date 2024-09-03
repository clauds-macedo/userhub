import { create, login } from '@/main/controllers/AuthenticationController';
import { Router } from 'express';

export const AuthRouter = Router();

AuthRouter.post('/register', create);
AuthRouter.post('/login', login);
