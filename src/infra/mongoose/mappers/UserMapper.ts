import { ICreateUserDTO } from '@/domain/dtos/IUserDTO';
import { IAddress } from '@/domain/entities/Address';
import { User as DomainUser, IUser } from '@/domain/entities/User';
import { InferSchemaType } from 'mongoose';
import { MongooseUser } from '../models/MongooseUser';

type TMongooseUserDocument = InferSchemaType<typeof MongooseUser.schema>;

export class UserMapper {
  static toDomain(
    userDocument: TMongooseUserDocument & { id: string }
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

  static toPersistence(domainUser: ICreateUserDTO): TMongooseUserDocument {
    return {
      name: domainUser.name,
      email: domainUser.email,
      password: domainUser.password,
      createdAt: new Date(),
      addresses: [],
    } as unknown as TMongooseUserDocument;
  }
}
