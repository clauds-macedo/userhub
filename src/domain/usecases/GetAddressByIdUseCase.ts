import { IAddress } from '../entities/Address';
import { IAddressRepository } from '../repositories/IAddressRepository';

export class GetAddressByIdUseCase {
  constructor(private addressRepository: IAddressRepository) {}

  async execute(id: string): Promise<IAddress | null> {
    return this.addressRepository.findById(id);
  }
}
