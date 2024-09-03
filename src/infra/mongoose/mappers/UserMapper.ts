import { ICreateUserDTO } from '@/domain/dtos/IUserDTO';
import { IAddress } from '@/domain/entities/Address';
import { User as DomainUser, IUser } from '@/domain/entities/User';
import { InferSchemaType } from 'mongoose';
import { MongooseUser } from '../models/MongooseUser';

type MongooseUserDocument = InferSchemaType<typeof MongooseUser.schema>;

export class UserMapper {
  static toDomain(
    userDocument: MongooseUserDocument & { id: string }
  ): DomainUser {
    const addresses: IAddress[] = userDocument.addresses?.map((address) => ({
      street: address.street || '',
      city: address.city || '',
      userId: userDocument.id,
      id: address.id,
    }));

    const user: IUser = {
      ...userDocument,
      addresses,
    };

    return new DomainUser(user);
  }

  static toPersistence(domainUser: ICreateUserDTO): MongooseUserDocument {
    return {
      name: domainUser.name,
      email: domainUser.email,
      password: domainUser.password,
      createdAt: new Date(),
      addresses: [],
    } as unknown as MongooseUserDocument;
  }
}
