import { IAddress } from '@/domain/entities/Address';
import {
  AddressMapper,
  TMongooseAddressDocument,
} from '@/infra/mongoose/mappers/AddressMapper';
import mongoose from 'mongoose';

describe('AddressMapper', () => {
  it('should map Mongoose address document to domain entity', () => {
    const mongooseAddressDocument: TMongooseAddressDocument & { id: string } = {
      id: '507f191e810c19729de860ea',
      userId: new mongoose.Types.ObjectId(),
      street: 'Rua 2013912',
      city: 'Guarulhos',
    };

    const domainAddress: IAddress = AddressMapper.toDomain(
      mongooseAddressDocument
    );

    expect(domainAddress).toEqual({
      id: '507f191e810c19729de860ea',
      userId: mongooseAddressDocument.userId.toString(),
      street: 'Rua 2013912',
      city: 'Guarulhos',
    });
  });

  it('should map domain entity to persistence format', () => {
    const domainAddress: Partial<IAddress> = {
      userId: '507f191e810c19729de860eb',
      street: 'Rua Utinga',
      city: 'Utinga Leão',
    };

    const persistenceAddress = AddressMapper.toPersistence(domainAddress);

    expect(persistenceAddress).toEqual({
      userId: '507f191e810c19729de860eb',
      street: 'Rua Utinga',
      city: 'Utinga Leão',
    });
  });

  it('should handle partial domain entities for persistence mapping', () => {
    const partialDomainAddress: Partial<IAddress> = {
      street: '11',
    };

    const persistenceAddress =
      AddressMapper.toPersistence(partialDomainAddress);

    expect(persistenceAddress).toEqual({
      userId: undefined,
      street: '11',
      city: undefined,
    });
  });
});
