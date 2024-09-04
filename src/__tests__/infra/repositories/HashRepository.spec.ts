import { MockHashRepository } from '@/__tests__/__mocks__/MockHashRepository';
import { ComparePasswordUseCase } from '@/domain/usecases/ComparePasswordUseCase';
import { HashPasswordUseCase } from '@/domain/usecases/HashPasswordUseCase';

describe('MockHashRepository', () => {
  let mockHashRepository: MockHashRepository;
  let hashPasswordUseCase: HashPasswordUseCase;
  let comparePasswordUseCase: ComparePasswordUseCase;

  beforeEach(() => {
    mockHashRepository = new MockHashRepository();
    hashPasswordUseCase = new HashPasswordUseCase(mockHashRepository);
    comparePasswordUseCase = new ComparePasswordUseCase(mockHashRepository);
  });

  it('should hash the password correctly', async () => {
    const password = 'my-password';
    const hashedPassword = await hashPasswordUseCase.execute(password);

    expect(hashedPassword).toBe(`hashed-${password}`);
  });

  it('should return true when comparing the correct password', async () => {
    const password = 'my-password';
    const hashedPassword = `hashed-${password}`;

    const isMatch = await comparePasswordUseCase.execute(
      password,
      hashedPassword
    );

    expect(isMatch).toBe(true);
  });

  it('should return false when comparing the wrong password', async () => {
    const password = 'my-password';
    const wrongPassword = 'wrong-password';
    const hashedPassword = `hashed-${password}`;

    const isMatch = await mockHashRepository.comparePassword(
      wrongPassword,
      hashedPassword
    );

    expect(isMatch).toBe(false);
  });
});
