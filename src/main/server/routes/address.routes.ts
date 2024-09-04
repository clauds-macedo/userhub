import { authMiddleware } from '@/infra/middlewares/auth';
import {
  createAddress,
  deleteAddress,
  getAddressById,
  getAllAddresses,
  updateAddress,
} from '@/main/controllers/AddressController';
import { Router } from 'express';

export const AddressRouter = Router();

AddressRouter.post('/', authMiddleware, createAddress);
AddressRouter.get('/', getAllAddresses);
AddressRouter.get('/:id', authMiddleware, getAddressById);
AddressRouter.delete('/:id', authMiddleware, deleteAddress);
AddressRouter.patch('/:id', updateAddress);
