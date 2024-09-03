import { ComparePasswordUseCase } from '@/domain/usecases/ComparePasswordUseCase';
import { HashPasswordUseCase } from '@/domain/usecases/HashPasswordUseCase';
import { BcryptHashRepository } from '@/infra/repositories/BcryptHashRepository';

export const hashPasswordFactory = new HashPasswordUseCase(
  new BcryptHashRepository()
);
export const comparePasswordFactory = new ComparePasswordUseCase(
  new BcryptHashRepository()
);
