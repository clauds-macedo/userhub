import { ICreateUserDTO } from '@/domain/dtos/IUserDTO';
import { IUser, User } from '@/domain/entities/User';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { Document } from 'mongoose';
import {
  TMongooseUserDocument,
  UserMapper,
} from '../mongoose/mappers/UserMapper';
import { MongooseUser } from '../mongoose/models/MongooseUser';

export class MongooseUserRepository implements IUserRepository {
  private toDomainModel(userDocument: TMongooseUserDocument & Document): User {
    const { _id, ...rest } = userDocument.toObject();
    return UserMapper.toDomain({
      id: _id.toString(),
      ...rest,
    });
  }

  private toPersistenceModel(user: Partial<User>) {
    return UserMapper.toPersistence(user);
  }

  async create(user: ICreateUserDTO): Promise<User> {
    const userDocument = new MongooseUser(this.toPersistenceModel(user));
    await userDocument.save();
    return this.toDomainModel(userDocument);
  }

  async remove(id: string): Promise<boolean> {
    const result = await MongooseUser.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }

  async update(id: string, user: Partial<IUser>): Promise<User | null> {
    const userDocument = await MongooseUser.findByIdAndUpdate(
      id,
      this.toPersistenceModel(user),
      {
        new: true,
      }
    ).exec();
    if (!userDocument) {
      return null;
    }
    return this.toDomainModel(userDocument);
  }

  async findById(id: string): Promise<User | null> {
    const userDocument = await MongooseUser.findById(id)
      .populate('addresses')
      .exec();
    if (!userDocument) {
      return null;
    }
    return this.toDomainModel(userDocument);
  }

  async findAll(): Promise<User[]> {
    const userDocuments = await MongooseUser.find()
      .populate('addresses')
      .exec();
    return userDocuments.map((userDocument) =>
      this.toDomainModel(userDocument)
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDocument = await MongooseUser.findOne({ email }).exec();
    if (!userDocument) {
      return null;
    }
    return this.toDomainModel(userDocument);
  }
}
