import { authMiddleware } from '@/infra/middlewares/auth';
import {
  getAllUsers,
  getUserById,
  updateUser,
} from '@/main/controllers/UserController';
import { Router } from 'express';

export const UserRouter = Router();

UserRouter.get('/', authMiddleware, getAllUsers);
UserRouter.get('/:id', authMiddleware, getUserById);
UserRouter.post('/:id', authMiddleware, updateUser);
