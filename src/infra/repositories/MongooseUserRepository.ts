import { ICreateUserDTO } from '@/domain/dtos/IUserDTO';
import { IUser, User } from '@/domain/entities/User';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { UserMapper } from '../mongoose/mappers/UserMapper';
import { MongooseUser } from '../mongoose/models/MongooseUser';

export class MongooseUserRepository implements IUserRepository {
  async create(user: ICreateUserDTO): Promise<User> {
    const userDocument = new MongooseUser(UserMapper.toPersistence(user));
    await userDocument.save();
    const { _id, ...rest } = userDocument.toObject();
    return UserMapper.toDomain({
      id: _id.toString(),
      ...rest,
    });
  }

  async remove(id: string): Promise<boolean> {
    const result = await MongooseUser.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }

  async update(id: string, user: Partial<IUser>): Promise<User | null> {
    const userDocument = await MongooseUser.findByIdAndUpdate(id, user, {
      new: true,
    }).exec();
    if (!userDocument) {
      return null;
    }
    const { _id, ...rest } = userDocument.toObject();
    return UserMapper.toDomain({
      id: _id.toString(),
      ...rest,
    });
  }

  async findById(id: string): Promise<User | null> {
    const userDocument = await MongooseUser.findById(id)
      .populate('addresses')
      .exec();
    if (!userDocument) {
      return null;
    }
    const { _id, ...rest } = userDocument.toObject();
    return UserMapper.toDomain({
      id: _id.toString(),
      ...rest,
    });
  }

  async findAll(): Promise<User[]> {
    const userDocuments = await MongooseUser.find()
      .populate('addresses')
      .exec();
    return userDocuments.map((userDocument) => {
      const { _id, ...rest } = userDocument.toObject();
      return UserMapper.toDomain({
        id: _id.toString(),
        ...rest,
      });
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDocument = await MongooseUser.findOne({ email }).exec();
    if (!userDocument) {
      return null;
    }
    const { _id, ...rest } = userDocument.toObject();
    return UserMapper.toDomain({
      id: _id.toString(),
      ...rest,
    });
  }
}
