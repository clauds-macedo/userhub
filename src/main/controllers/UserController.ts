import { Request, Response } from 'express';
import {
  findAllUsersFactory,
  getUserByIdFactory,
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
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
