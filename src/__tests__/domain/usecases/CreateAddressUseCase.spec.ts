import { IAddressRepository } from '@/domain/repositories/IAddressRepository';
import { CreateAddressUseCase } from '@/domain/usecases/CreateAddressUseCase';

describe('CreateAddressUseCase', () => {
  let createAddressUseCase: CreateAddressUseCase;
  let mockAddressRepository: jest.Mocked<IAddressRepository>;

  beforeEach(() => {
    mockAddressRepository = {
      create: jest.fn(),
      findByUserId: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    createAddressUseCase = new CreateAddressUseCase(mockAddressRepository);
  });

  it('should create an address with valid data', async () => {
    const addressData = {
      userId: '123',
      street: 'Main St',
      city: 'Sample City',
    };
    await createAddressUseCase.execute(addressData);

    expect(mockAddressRepository.create).toHaveBeenCalledWith(addressData);
  });

  it('should throw an error if required data is missing', async () => {
    const address = await createAddressUseCase.execute({
      userId: '123',
      city: 'City',
    } as CreateAddressDTO);
    expect(address).toBeUndefined();
  });
});
