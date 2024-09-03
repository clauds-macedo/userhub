import { IUser, User } from '@/domain/entities/User';
import { generateFakeAddress } from './generateFakeAddress';

export const generateFakeUser = (overrides?: Partial<IUser>): User => {
  const defaultUser: IUser = {
    id: Math.floor(Math.random() * 1000),
    name: `User ${Math.floor(Math.random() * 100)}`,
    email: `user${Math.floor(Math.random() * 1000)}@example.com`,
    password: `password${Math.floor(Math.random() * 1000)}`,
    createdAt: new Date(),
    addresses: [generateFakeAddress()],
  };

  return new User({ ...defaultUser, ...overrides });
};
