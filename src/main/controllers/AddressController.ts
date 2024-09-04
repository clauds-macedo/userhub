import { Request, Response } from 'express';
import {
  createAddressFactory,
  deleteAddressFactory,
  findAddressesByUserIdFactory,
  getAllAddressesFactory,
  updateAddressFactory,
} from '../factories/MakeAddressService';

export const createAddress = async (req: Request, res: Response) => {
  const { street, city, userId } = req.body;

  try {
    const address = await createAddressFactory.execute({
      userId,
      street,
      city,
    });

    return res.status(201).json(address);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getAllAddresses = async (req: Request, res: Response) => {
  const filters = req.query;
  try {
    const addresses = await getAllAddressesFactory.execute(filters);

    return res.status(200).json(addresses);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getAddressById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const filters = req.query;

  try {
    const address = await findAddressesByUserIdFactory.execute(id, filters);
    if (!address || address.length === 0) {
      return res.status(404).json({ message: 'Address not found' });
    }

    return res.status(200).json(address);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteAddress = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedAddress = await deleteAddressFactory.execute(id);

    if (deletedAddress) {
      return res.status(200).json({ message: 'Address deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Address not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateAddress = async (req: Request, res: Response) => {
  const { id } = req.params;
  const address = req.body;

  try {
    const updatedAddress = await updateAddressFactory.execute(id, address);

    if (updatedAddress) {
      return res.status(200).json(updatedAddress);
    } else {
      return res.status(404).json({ message: 'Address not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
