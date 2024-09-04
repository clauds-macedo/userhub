import { EHttpStatusCode } from '@/domain/enums/EHttpStatusCode';
import { Request, Response } from 'express';
import {
  deleteAddressFactory,
  findAddressesByUserIdFactory,
} from '../factories/MakeAddressService';
import {
  deleteUserFactory,
  findAllUsersFactory,
  getUserByIdFactory,
  updateUserFactory,
} from '../factories/MakeUserService';

const getUserAndAddresses = async (id: string) => {
  const user = await getUserByIdFactory.execute(id);
  if (!user) {
    return null;
  }
  const addresses = await findAddressesByUserIdFactory.execute(id);
  return { user, addresses };
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await findAllUsersFactory.execute();

    const usersWithAddresses = await Promise.all(
      users.map(async (user) => {
        const addresses = await findAddressesByUserIdFactory.execute(user.id);
        return { ...user, addresses };
      })
    );

    return res.status(EHttpStatusCode.SUCCESS).json(usersWithAddresses);
  } catch (error) {
    return res
      .status(EHttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal Server Error' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await getUserAndAddresses(id);
    if (!result) {
      return res
        .status(EHttpStatusCode.NOT_FOUND)
        .json({ message: 'User not found' });
    }

    const { user, addresses } = result;
    const { email, name } = user;

    return res.status(EHttpStatusCode.SUCCESS).json({ email, name, addresses });
  } catch (error) {
    return res
      .status(EHttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal Server Error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const updatedUser = await updateUserFactory.execute(id, {
      name,
      email,
      password,
    });
    if (!updatedUser) {
      return res
        .status(EHttpStatusCode.NOT_FOUND)
        .json({ message: 'User not found' });
    }
    return res.status(EHttpStatusCode.SUCCESS).json(updatedUser);
  } catch (error) {
    return res
      .status(EHttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal Server Error' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const success = await deleteUserFactory.execute(id);
    if (!success) {
      return res
        .status(EHttpStatusCode.NOT_FOUND)
        .json({ message: 'User not found' });
    }
    await deleteAddressFactory.execute(id);

    return res
      .status(EHttpStatusCode.SUCCESS)
      .json({ message: 'User and associated addresses deleted successfully' });
  } catch (error) {
    return res
      .status(EHttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal Server Error' });
  }
};
