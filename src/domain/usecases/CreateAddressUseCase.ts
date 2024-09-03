import { IAddress } from '../entities/Address';
import { IAddressRepository } from '../repositories/IAddressRepository';

export class CreateAddressUseCase {
  constructor(private addressRepository: IAddressRepository) {}

  async execute(data: CreateAddressDTO): Promise<IAddress> {
    return this.addressRepository.create(data);
  }
}
