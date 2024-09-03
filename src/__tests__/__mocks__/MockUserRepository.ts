import { ICreateUserDTO } from '@/domain/dtos/IUserDTO';
import { IUser, User } from '@/domain/entities/User';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { randomUUID } from 'crypto';

export class MockUserRepository implements IUserRepository {
  private users: User[] = [];

  async create(userDTO: ICreateUserDTO): Promise<User> {
    const user = new User({
      ...userDTO,
      createdAt: new Date(),
      id: randomUUID(),
      addresses: [],
    });
    this.users.push(user);
    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async update(id: string, userDTO: Partial<IUser>): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) {
      return null;
    }
    if (userDTO.name !== undefined) user.name = userDTO.name;
    if (userDTO.email !== undefined) user.email = userDTO.email;
    if (userDTO.password !== undefined) user.password = userDTO.password;

    return user;
  }

  async remove(id: string): Promise<boolean> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }
}
