import { IHashServiceRepository } from '@/domain/repositories/IHashServiceRepository';
import argon2 from 'argon2';

export class Argon2HashRepository implements IHashServiceRepository {
  private readonly options = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
  };

  async hashPassword(password: string): Promise<string> {
    return argon2.hash(password, this.options);
  }

  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return argon2.verify(hashedPassword, password);
  }
}
