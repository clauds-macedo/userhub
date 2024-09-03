import { ICreateUserDTO } from '@/domain/dtos/IUserDTO';
import { IUser, User } from '@/domain/entities/User';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { UserMapper } from '../mongoose/mappers/UserMapper';
import { MongooseUser } from '../mongoose/models/MongooseUser';

export class MongooseUserRepository implements IUserRepository {
  remove: (id: string) => Promise<boolean>;
  update: (id: string, user: Partial<IUser>) => Promise<User | null>;
  findById: (id: string) => Promise<User | null>;
  findAll: () => Promise<User[]>;

  async create(user: ICreateUserDTO): Promise<User> {
    const userDocument = new MongooseUser(UserMapper.toPersistence(user));
    await userDocument.save();
    const { _id, ...rest } = userDocument.toObject();
    return UserMapper.toDomain({
      id: _id.toString(),
      ...rest,
    });
  }
}
