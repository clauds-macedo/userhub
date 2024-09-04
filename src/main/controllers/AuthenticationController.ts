import { EErrorMessages } from '@/domain/enums/EErrorMessages';
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
        .json({ message: EErrorMessages.USER_ALREADY_EXISTS });
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
        .json({ message: EErrorMessages.PASSWORD_CHARACTERS_COUNT });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    return res.status(EHttpStatusCode.CREATED).json({ token, user });
  } catch (error) {
    return res
      .status(EHttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: EErrorMessages.INTERNAL_SERVER_ERROR });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await findByEmailFactory.execute(email);
    if (!user) {
      return res
        .status(EHttpStatusCode.BAD_REQUEST)
        .json({ message: EErrorMessages.INVALID_CREDENTIALS });
    }

    const isMatch = await comparePasswordFactory.execute(
      password,
      user.password
    );
    if (!isMatch) {
      return res
        .status(EHttpStatusCode.BAD_REQUEST)
        .json({ message: EErrorMessages.INVALID_CREDENTIALS });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    return res.status(EHttpStatusCode.SUCCESS).json({ token, user });
  } catch (error) {
    return res
      .status(EHttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: EErrorMessages.INTERNAL_SERVER_ERROR });
  }
};
