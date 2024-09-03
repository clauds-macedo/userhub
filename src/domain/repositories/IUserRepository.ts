import { ICreateUserDTO } from '../dtos/IUserDTO';
import { User } from '../entities/User';

export interface IUserRepository {
  create: (user: ICreateUserDTO) => Promise<void>;
  remove: (id: number) => Promise<boolean>;
  update: (id: number, user: Partial<ICreateUserDTO>) => Promise<User>;
  findById: (id: number) => Promise<User | null>;
  findAll: () => Promise<User[]>;
}
