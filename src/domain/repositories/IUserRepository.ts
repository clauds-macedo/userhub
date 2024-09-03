import { ICreateUserDTO } from '../dtos/IUserDTO';
import { IUser, User } from '../entities/User';

export interface IUserRepository {
  create: (user: ICreateUserDTO) => Promise<User>;
  remove: (id: number) => Promise<boolean>;
  update: (id: number, user: Partial<IUser>) => Promise<User | null>;
  findById: (id: number) => Promise<User | null>;
  findAll: () => Promise<User[]>;
}
