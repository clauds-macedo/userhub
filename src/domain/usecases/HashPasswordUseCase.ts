import { IHashServiceRepository } from '../repositories/IHashServiceRepository';

export class HashPasswordUseCase {
  constructor(private hashServiceRepository: IHashServiceRepository) {}

  async execute(password: string) {
    await this.hashServiceRepository.hashPassword(password);
  }
}
