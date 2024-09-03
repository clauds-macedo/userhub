import { IAddress } from '../entities/Address';
import { IAddressRepository } from '../repositories/IAddressRepository';

export class FindAddressesByUserIdUseCase {
  constructor(private addressRepository: IAddressRepository) {}

  async execute(
    userId: string,
    filters: Partial<IAddress> = {}
  ): Promise<IAddress[]> {
    return this.addressRepository.findByUserId(userId, filters);
  }
}
