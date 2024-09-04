import { IAddress } from '@/domain/entities/Address';
import { IAddressRepository } from '@/domain/repositories/IAddressRepository';
import { generateFakeAddress } from '../fakes/generateFakeAddress';

export class MockAddressRepository implements IAddressRepository {
  private addresses: IAddress[] = [];

  async create(data: Partial<IAddress>): Promise<IAddress> {
    const newAddress: IAddress = {
      ...generateFakeAddress(),
      ...data,
    } as IAddress;

    this.addresses.push(newAddress);
    return newAddress;
  }

  async findByUserId(
    userId: string,
    filters?: Partial<IAddress>
  ): Promise<IAddress[]> {
    return this.addresses.filter(
      (address) =>
        address.userId === userId && this.matchFilters(address, filters)
    );
  }

  async findAll(filters?: Partial<IAddress>): Promise<IAddress[]> {
    if (!filters) return this.addresses;
    return this.addresses.filter((address) =>
      this.matchFilters(address, filters)
    );
  }

  async update(id: string, data: Partial<IAddress>): Promise<IAddress | null> {
    const index = this.addresses.findIndex((address) => address.id === id);
    if (index === -1) return null;

    const updatedAddress = { ...this.addresses[index], ...data };
    this.addresses[index] = updatedAddress;

    return updatedAddress;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.addresses.findIndex((address) => address.id === id);
    if (index === -1) return false;

    this.addresses.splice(index, 1);
    return true;
  }

  private matchFilters(
    address: IAddress,
    filters?: Partial<IAddress>
  ): boolean {
    if (!filters) return true;
    return Object.keys(filters).every((key) => {
      return (filters as any)[key] === (address as any)[key];
    });
  }
}
