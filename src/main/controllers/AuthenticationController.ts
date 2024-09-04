import { EHttpStatusCode } from '@/domain/enums/EHttpStatusCode';
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
      return res
        .status(EHttpStatusCode.BAD_REQUEST)
        .json({ message: 'User already exists' });
    }
    const hashedPassword = await hashPasswordFactory.execute(password);

    const user = await createUserFactory.execute({
      name,
      email,
      password: hashedPassword,
    });

    if (!user.validatePassword(password)) {
      return res
        .status(EHttpStatusCode.BAD_REQUEST)
        .json({ message: 'Password should have more than 8 characters' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    return res.status(EHttpStatusCode.CREATED).json({ token, user });
  } catch (error) {
    return res
      .status(EHttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal Server Error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await findByEmailFactory.execute(email);
    if (!user) {
      return res
        .status(EHttpStatusCode.BAD_REQUEST)
        .json({ message: 'Invalid credentials' });
    }

    const isMatch = await comparePasswordFactory.execute(
      password,
      user.password
    );
    if (!isMatch) {
      return res
        .status(EHttpStatusCode.BAD_REQUEST)
        .json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    return res.status(EHttpStatusCode.SUCCESS).json({ token, user });
  } catch (error) {
    return res
      .status(EHttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal Server Error' });
  }
};
