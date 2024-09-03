import {
  createAddress,
  getAddressById,
  getAllAddresses,
} from '@/main/controllers/AddressController';
import { Router } from 'express';

export const AddressRouter = Router();

AddressRouter.post('/', createAddress);
AddressRouter.get('/', getAllAddresses);
AddressRouter.get('/:id', getAddressById);
