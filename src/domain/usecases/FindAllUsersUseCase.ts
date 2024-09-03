import { User } from '../entities/User';
import { IUserRepository } from '../repositories/IUserRepository';

export class FindAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
