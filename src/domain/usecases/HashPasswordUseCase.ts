import { IHashServiceRepository } from '../repositories/IHashServiceRepository';

export class HashPasswordUseCase {
  constructor(private hashServiceRepository: IHashServiceRepository) {}

  async execute(password: string) {
    return this.hashServiceRepository.hashPassword(password);
  }
}
