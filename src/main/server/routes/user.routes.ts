import { authMiddleware } from '@/infra/middlewares/auth';
import { getAllUsers, getUserById } from '@/main/controllers/UserController';
import { Router } from 'express';

export const UserRouter = Router();

UserRouter.get('/', authMiddleware, getAllUsers);
UserRouter.get('/:id', authMiddleware, getUserById);
