import { IHashServiceRepository } from '../repositories/IHashServiceRepository';

export class ComparePasswordUseCase {
  constructor(private hashServiceRepository: IHashServiceRepository) {}

  async execute(password: string, hashedPassword: string) {
    return this.hashServiceRepository.comparePassword(password, hashedPassword);
  }
}
