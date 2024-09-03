import { IAddress } from '@/domain/entities/Address';
import { IAddressRepository } from '@/domain/repositories/IAddressRepository';
import { Document } from 'mongoose';
import {
  AddressMapper,
  TMongooseUserDocument,
} from '../mongoose/mappers/AddressMapper';
import { MongooseAddress } from '../mongoose/models/MongooseAddress';

export class MongooseAddressRepository implements IAddressRepository {
  private toDomainModel(
    addressDocument: TMongooseUserDocument & Document
  ): IAddress {
    const { _id, ...rest } = addressDocument.toObject();
    return AddressMapper.toDomain({ id: _id.toString(), ...rest });
  }

  private toPersistenceModel(data: Partial<IAddress>): Partial<IAddress> {
    return AddressMapper.toPersistence(data);
  }

  async create(data: Partial<IAddress>): Promise<IAddress> {
    const addressDocument = new MongooseAddress(this.toPersistenceModel(data));
    await addressDocument.save();
    return this.toDomainModel(addressDocument);
  }

  async findByUserId(
    userId: string,
    filters: Partial<IAddress> = {}
  ): Promise<IAddress[]> {
    const addressDocuments = await MongooseAddress.find({
      userId,
      ...filters,
    }).exec();
    return addressDocuments.map((doc) => this.toDomainModel(doc));
  }

  async findById(id: string): Promise<IAddress | null> {
    const addressDocument = await MongooseAddress.findById(id).exec();
    return addressDocument ? this.toDomainModel(addressDocument) : null;
  }

  async update(id: string, data: Partial<IAddress>): Promise<IAddress | null> {
    const addressDocument = await MongooseAddress.findByIdAndUpdate(
      id,
      this.toPersistenceModel(data),
      {
        new: true,
      }
    ).exec();
    return addressDocument ? this.toDomainModel(addressDocument) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await MongooseAddress.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }
}
