import { ComparePasswordUseCase } from '@/domain/usecases/ComparePasswordUseCase';
import { HashPasswordUseCase } from '@/domain/usecases/HashPasswordUseCase';
import { BcryptHashRepository } from '@/infra/repositories/BcryptHashRepository';

export const hashRepository = new BcryptHashRepository();

export const hashPasswordFactory = new HashPasswordUseCase(hashRepository);
export const comparePasswordFactory = new ComparePasswordUseCase(
  hashRepository
);
