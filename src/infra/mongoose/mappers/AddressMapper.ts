import { IAddress } from '@/domain/entities/Address';
import { InferSchemaType } from 'mongoose';
import { MongooseAddress } from '../models/MongooseAddress';

export type TMongooseUserDocument = InferSchemaType<
  typeof MongooseAddress.schema
>;

export class AddressMapper {
  static toDomain(
    addressDocument: TMongooseUserDocument & { id: string }
  ): IAddress {
    return {
      id: addressDocument.id.toString(),
      userId: addressDocument.userId.toString(),
      street: addressDocument.street,
      city: addressDocument.city,
    };
  }

  static toPersistence(address: Partial<IAddress>) {
    return {
      userId: address.userId,
      street: address.street,
      city: address.city,
    };
  }
}
