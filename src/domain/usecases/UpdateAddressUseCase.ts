import { IAddress } from '../entities/Address';
import { IAddressRepository } from '../repositories/IAddressRepository';

export class UpdateAddressUseCase {
  constructor(private addressRepository: IAddressRepository) {}

  async execute(id: string, data: UpdateAddressDTO): Promise<IAddress | null> {
    return this.addressRepository.update(id, data);
  }
}
