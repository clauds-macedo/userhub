import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {
  comparePasswordFactory,
  hashPasswordFactory,
} from '../factories/MakeHashService';
import {
  createUserFactory,
  findByEmailFactory,
} from '../factories/MakeUserService';

export const create = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  console.log(req.body, 'req body');
  try {
    const userFound = await findByEmailFactory.execute(email);
    if (userFound) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await hashPasswordFactory.execute(password);

    const user = await createUserFactory.execute({
      name,
      email,
      password: hashedPassword,
    });

    console.log(user);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    return res.status(201).json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await findByEmailFactory.execute(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await comparePasswordFactory.execute(
      password,
      user.password
    );
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
