import { Request, Response } from 'express';
import {
  createAddressFactory,
  findAddressesByUserIdFactory,
  getAllAddressesFactory,
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
  try {
    const addresses = await getAllAddressesFactory.execute();

    return res.status(200).json(addresses);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getAddressById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const address = await findAddressesByUserIdFactory.execute(id);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    return res.status(200).json(address);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
