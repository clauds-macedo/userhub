import { IAddressRepository } from '../repositories/IAddressRepository';

export class DeleteAddressUseCase {
  constructor(private addressRepository: IAddressRepository) {}

  async execute(id: string): Promise<boolean> {
    return this.addressRepository.delete(id);
  }
}
