import { IHashServiceRepository } from '@/domain/repositories/IHashServiceRepository';
import { compare, genSalt, hash } from 'bcrypt';

export class BcryptHashRepository implements IHashServiceRepository {
  private readonly saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(this.saltRounds);
    return hash(password, salt);
  }

  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}
