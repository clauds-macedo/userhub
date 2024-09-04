import { IAddress } from '@/domain/entities/Address';
import { User as DomainUser, IUser, User } from '@/domain/entities/User';
import { InferSchemaType } from 'mongoose';
import { MongooseUser } from '../models/MongooseUser';

export type TMongooseUserDocument = InferSchemaType<typeof MongooseUser.schema>;

export class UserMapper {
  static toDomain(
    userDocument: TMongooseUserDocument & { id: string }
  ): DomainUser {
    const addresses: IAddress[] = userDocument.addresses?.map((address) => ({
      street: address.street || '',
      city: address.city || '',
      userId: userDocument.id,
      id: address._id.toString(),
    }));

    const user: IUser = {
      ...userDocument,
      addresses,
    };

    return new DomainUser(user);
  }

  static toPersistence(domainUser: Partial<User>) {
    return {
      name: domainUser.name,
      email: domainUser.email,
      password: domainUser.password,
      createdAt: new Date(),
      addresses: [],
    };
  }
}
