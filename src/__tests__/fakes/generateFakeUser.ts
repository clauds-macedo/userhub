import { IUser, User } from '@/domain/entities/User';
import { randomUUID } from 'crypto';
import { generateFakeAddress } from './generateFakeAddress';

export const generateFakeUser = (overrides?: Partial<IUser>): User => {
  const defaultUser: IUser = {
    id: randomUUID(),
    name: `User ${Math.floor(Math.random() * 100)}`,
    email: `user${Math.floor(Math.random() * 1000)}@example.com`,
    password: `password${Math.floor(Math.random() * 1000)}`,
    createdAt: new Date(),
    addresses: [generateFakeAddress()],
  };

  return new User({ ...defaultUser, ...overrides });
};
