import { ICreateUserDTO } from '@/domain/dtos/IUserDTO';
import { IUser, User } from '@/domain/entities/User';
import { IUserRepository } from '@/domain/repositories/IUserRepository';

export class MockUserRepository implements IUserRepository {
  private users: User[] = [];
  private nextId = 1;

  async create(userDTO: ICreateUserDTO): Promise<User> {
    const user = new User({
      ...userDTO,
      createdAt: new Date(),
      id: this.nextId++,
      addresses: [],
    });
    this.users.push(user);
    return user;
  }

  async findById(id: number): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async update(id: number, userDTO: Partial<IUser>): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) {
      return null;
    }
    if (userDTO.name !== undefined) user.name = userDTO.name;
    if (userDTO.email !== undefined) user.email = userDTO.email;
    if (userDTO.password !== undefined) user.password = userDTO.password;

    return user;
  }

  async remove(id: number): Promise<boolean> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }
}
