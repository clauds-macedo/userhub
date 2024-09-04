import { authMiddleware } from '@/infra/middlewares/auth';
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '@/main/controllers/UserController';
import { Router } from 'express';

export const UserRouter = Router();

UserRouter.get('/', authMiddleware, getAllUsers);
UserRouter.get('/:id', authMiddleware, getUserById);
UserRouter.patch('/:id', authMiddleware, updateUser);
UserRouter.delete('/:id', authMiddleware, deleteUser);
