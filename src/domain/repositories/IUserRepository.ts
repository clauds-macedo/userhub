import { ICreateUserDTO } from '../dtos/IUserDTO';
import { IUser, User } from '../entities/User';

export interface IUserRepository {
  create: (user: ICreateUserDTO) => Promise<User>;
  remove: (id: string) => Promise<boolean>;
  update: (id: string, user: Partial<IUser>) => Promise<User | null>;
  findById: (id: string) => Promise<User | null>;
  findAll: () => Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
}
