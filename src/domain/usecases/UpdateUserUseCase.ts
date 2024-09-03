import { IUser, User } from '../entities/User';
import { IHashServiceRepository } from '../repositories/IHashServiceRepository';
import { IUserRepository } from '../repositories/IUserRepository';

export class UpdateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashService: IHashServiceRepository
  ) {}

  async execute(id: string, data: Partial<IUser>): Promise<User | null> {
    const { password } = data;
    if (password) {
      data.password = await this.hashService.hashPassword(password);
    }
    return this.userRepository.update(id, data);
  }
}
