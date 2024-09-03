import { ICreateUserDTO } from '../dtos/IUserDTO';
import { User } from '../entities/User';
import { IUserRepository } from '../repositories/IUserRepository';

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ICreateUserDTO): Promise<User> {
    return this.userRepository.create(data);
  }
}
