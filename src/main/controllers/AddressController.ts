import { EErrorMessages } from '@/domain/enums/EErrorMessages';
import { EHttpStatusCode } from '@/domain/enums/EHttpStatusCode';
import { ESuccessMessages } from '@/domain/enums/ESuccessMessages';
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
  console.log(req.body);
  try {
    const address = await createAddressFactory.execute({
      userId,
      street,
      city,
    });

    return res.status(EHttpStatusCode.CREATED).json(address);
  } catch (error) {
    return res
      .status(EHttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: EErrorMessages.INTERNAL_SERVER_ERROR });
  }
};

export const getAllAddresses = async (req: Request, res: Response) => {
  const filters = req.query;
  try {
    const addresses = await getAllAddressesFactory.execute(filters);

    return res.status(EHttpStatusCode.SUCCESS).json(addresses);
  } catch (error) {
    return res
      .status(EHttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: EErrorMessages.INTERNAL_SERVER_ERROR });
  }
};

export const getAddressById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const filters = req.query;

  try {
    const address = await findAddressesByUserIdFactory.execute(id, filters);
    if (!address || address.length === 0) {
      return res
        .status(EHttpStatusCode.NOT_FOUND)
        .json({ message: EErrorMessages.ADDRESS_NOT_FOUND });
    }

    return res.status(EHttpStatusCode.SUCCESS).json(address);
  } catch (error) {
    return res
      .status(EHttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: EErrorMessages.INTERNAL_SERVER_ERROR });
  }
};

export const deleteAddress = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedAddress = await deleteAddressFactory.execute(id);

    if (deletedAddress) {
      return res
        .status(EHttpStatusCode.SUCCESS)
        .json({ message: ESuccessMessages.ADDRESS_DELETED });
    } else {
      return res
        .status(EHttpStatusCode.NOT_FOUND)
        .json({ message: EErrorMessages.ADDRESS_NOT_FOUND });
    }
  } catch (error) {
    return res
      .status(EHttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: EErrorMessages.INTERNAL_SERVER_ERROR });
  }
};

export const updateAddress = async (req: Request, res: Response) => {
  const { id } = req.params;
  const address = req.body;

  try {
    const updatedAddress = await updateAddressFactory.execute(id, address);

    if (updatedAddress) {
      return res.status(EHttpStatusCode.SUCCESS).json(updatedAddress);
    } else {
      return res
        .status(EHttpStatusCode.NOT_FOUND)
        .json({ message: EErrorMessages.ADDRESS_NOT_FOUND });
    }
  } catch (error) {
    return res
      .status(EHttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: EErrorMessages.INTERNAL_SERVER_ERROR });
  }
};
