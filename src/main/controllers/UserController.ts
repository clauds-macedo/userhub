import { Request, Response } from 'express';
import {
  deleteUserFactory,
  findAllUsersFactory,
  getUserByIdFactory,
  updateUserFactory,
} from '../factories/MakeUserService';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await findAllUsersFactory.execute();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await getUserByIdFactory.execute(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { email, name, addresses } = user;
    return res.status(200).json({ email, name, addresses });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
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
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const success = await deleteUserFactory.execute(id);

    if (!success) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
