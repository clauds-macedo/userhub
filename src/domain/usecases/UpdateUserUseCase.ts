import { IUser, User } from '../entities/User';
import { IUserRepository } from '../repositories/IUserRepository';

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: number, data: Partial<IUser>): Promise<User | null> {
    return this.userRepository.update(id, data);
  }
}
