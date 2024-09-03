import { IAddress } from '@/domain/entities/Address';

export class AddressMapper {
  static toDomain(
    addressDocument: MongooseUserDocument & { id: string }
  ): IAddress {
    return {
      id: addressDocument._id.toString(),
      userId: addressDocument.userId,
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
