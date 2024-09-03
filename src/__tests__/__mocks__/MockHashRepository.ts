import { IHashServiceRepository } from '@/domain/repositories/IHashServiceRepository';

export class MockHashRepository implements IHashServiceRepository {
  async hashPassword(password: string): Promise<string> {
    return `hashed-${password}`;
  }

  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return hashedPassword === `hashed-${password}`;
  }
}
