import { EHttpStatusCode } from '@/domain/enums/EHttpStatusCode';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(EHttpStatusCode.UNAUTHORIZED)
      .json({ message: 'Access denied. No token provided or invalid format.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    return next();
  } catch (err) {
    return res
      .status(EHttpStatusCode.BAD_REQUEST)
      .json({ message: 'Invalid token.' });
  }
};
