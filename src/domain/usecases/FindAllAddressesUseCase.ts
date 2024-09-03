import { IAddress } from '../entities/Address';
import { IAddressRepository } from '../repositories/IAddressRepository';

export class FindAllAddressesUseCase {
  constructor(private addressRepository: IAddressRepository) {}

  async execute(): Promise<IAddress[]> {
    return this.addressRepository.findAll();
  }
}
