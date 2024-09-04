import { EHttpStatusCode } from '@/domain/enums/EHttpStatusCode';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(EHttpStatusCode.UNAUTHORIZED)
      .json({ message: 'Access denied. No token provided.' });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    return next();
  } catch (err) {
    res.status(EHttpStatusCode.BAD_REQUEST).json({ message: 'Invalid token.' });
  }
};
