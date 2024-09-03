import { User } from '../entities/User';
import { IUserRepository } from '../repositories/IUserRepository';

export class FindUserByEmailUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
