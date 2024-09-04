import { IAddress } from '../entities/Address';

export interface IAddressRepository {
  create(data: Partial<IAddress>): Promise<IAddress>;
  findByUserId(
    userId: string,
    filters?: Partial<IAddress>
  ): Promise<IAddress[]>;
  findAll(filters?: Partial<IAddress>): Promise<IAddress[]>;
  update(id: string, data: Partial<IAddress>): Promise<IAddress | null>;
  delete(id: string): Promise<boolean>;
}
