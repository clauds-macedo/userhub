import { IAddress } from '../entities/Address';
import { IAddressRepository } from '../repositories/IAddressRepository';

export class GetAddressesUseCase {
  constructor(private addressRepository: IAddressRepository) {}

  async execute(
    userId: string,
    filters: Partial<IAddress> = {}
  ): Promise<IAddress[]> {
    return this.addressRepository.findByUserId(userId, filters);
  }

  async executeById(id: string): Promise<IAddress | null> {
    return this.addressRepository.findById(id);
  }
}
