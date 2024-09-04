import { IAddress } from '@/domain/entities/Address';
import { IUser } from '@/domain/entities/User';
import {
  TMongooseUserDocument,
  UserMapper,
} from '@/infra/mongoose/mappers/UserMapper';
import { randomUUID } from 'crypto';
import mongoose from 'mongoose';

const mockDocumentArray = (addresses: IAddress[]) => {
  const docArray = new mongoose.Types.DocumentArray<
    TMongooseUserDocument['addresses'][0]
  >(addresses);

  docArray.forEach((address) => {
    if (!address._id) {
      address._id = new mongoose.Types.ObjectId();
    }
  });

  return docArray;
};

describe('UserMapper', () => {
  it('should map Mongoose user document to domain entity', () => {
    const mongooseUserDocument: TMongooseUserDocument & { id: string } = {
      id: '507f191e810c19729de860ea',
      name: 'Claudemir',
      email: 'claudemir@example.com',
      password: 'hashed-password',
      createdAt: new Date(),
      addresses: mockDocumentArray([
        {
          street: 'Rua 1',
          city: 'Maceió',
          userId: '507f191e810c19729de860ea',
          id: randomUUID(),
        },
        {
          street: 'Rua 2',
          city: 'Maceió',
          userId: '507f191e810c19729de860ea',
          id: randomUUID(),
        },
      ]),
    };

    const domainUser = UserMapper.toDomain(mongooseUserDocument);

    expect(domainUser).toEqual({
      id: mongooseUserDocument.id,
      name: 'Claudemir',
      email: 'claudemir@example.com',
      password: 'hashed-password',
      createdAt: mongooseUserDocument.createdAt,
      addresses: [
        {
          id: mongooseUserDocument.addresses[0]._id.toString(),
          street: 'Rua 1',
          city: 'Maceió',
          userId: '507f191e810c19729de860ea',
        },
        {
          id: mongooseUserDocument.addresses[1]._id.toString(),
          street: 'Rua 2',
          city: 'Maceió',
          userId: '507f191e810c19729de860ea',
        },
      ],
    });
  });

  it('should map domain user to persistence format', () => {
    const domainUser: Partial<IUser> = {
      name: 'Carlos da Silva',
      email: 'carlos.silva@example.com',
      password: 'hashed-password',
      addresses: [
        {
          id: '507f191e810c19729de860eb',
          street: 'Rua Teste',
          city: 'Maceió',
          userId: '507f191e810c19729de860ea',
        },
      ],
    };

    const persistenceUser = UserMapper.toPersistence(domainUser);

    expect(persistenceUser).toEqual({
      name: 'Carlos da Silva',
      email: 'carlos.silva@example.com',
      password: 'hashed-password',
      createdAt: expect.any(Date),
      addresses: [],
    });
  });

  it('should handle partial domain user for persistence mapping', () => {
    const partialDomainUser: Partial<IUser> = {
      name: 'Maria José',
    };

    const persistenceUser = UserMapper.toPersistence(partialDomainUser);

    expect(persistenceUser).toEqual({
      name: 'Maria José',
      email: undefined,
      password: undefined,
      createdAt: expect.any(Date),
      addresses: [],
    });
  });
});
