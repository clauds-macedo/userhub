import { MockAddressRepository } from '@/__tests__/__mocks__/MockAddressRepository';
import { generateFakeAddress } from '@/__tests__/fakes/generateFakeAddress';
import { IAddress } from '@/domain/entities/Address';
import { CreateAddressUseCase } from '@/domain/usecases/CreateAddressUseCase';
import { DeleteAddressUseCase } from '@/domain/usecases/DeleteAddressUseCase';
import { FindAllAddressesUseCase } from '@/domain/usecases/FindAllAddressesUseCase';
import { FindAddressesByUserIdUseCase } from '@/domain/usecases/GetAddressesUseCase';
import { UpdateAddressUseCase } from '@/domain/usecases/UpdateAddressUseCase';

const defaultAddress: Partial<IAddress> = {
  userId: '12345',
  street: 'Rua 8888888',
  city: 'Maceió',
};

describe('MockAddressRepository', () => {
  let addressRepository: MockAddressRepository;
  let createAddressUseCase: CreateAddressUseCase;
  let deleteAddressUseCase: DeleteAddressUseCase;
  let findAllAddressesUseCase: FindAllAddressesUseCase;
  let findAddressesByUserIdUseCase: FindAddressesByUserIdUseCase;
  let updateAddressUseCase: UpdateAddressUseCase;

  beforeEach(() => {
    addressRepository = new MockAddressRepository();
    createAddressUseCase = new CreateAddressUseCase(addressRepository);
    deleteAddressUseCase = new DeleteAddressUseCase(addressRepository);
    findAllAddressesUseCase = new FindAllAddressesUseCase(addressRepository);
    findAddressesByUserIdUseCase = new FindAddressesByUserIdUseCase(
      addressRepository
    );
    updateAddressUseCase = new UpdateAddressUseCase(addressRepository);
  });

  it('should find addresses by userId', async () => {
    const address1 = await createAddressUseCase.execute(
      defaultAddress as IAddress
    );
    const address2 = await createAddressUseCase.execute({
      ...generateFakeAddress(),
      userId: '12345',
    });

    const addresses = await findAddressesByUserIdUseCase.execute('12345');

    expect(addresses.length).toBe(2);
    expect(addresses[0].street).toBe(address1.street);
    expect(addresses[1].street).toBe(address2.street);
  });

  it('should return all addresses', async () => {
    await createAddressUseCase.execute(defaultAddress as IAddress);
    await createAddressUseCase.execute(generateFakeAddress() as IAddress);

    const allAddresses = await findAllAddressesUseCase.execute();
    expect(allAddresses.length).toBe(2);
  });

  it('should update an address', async () => {
    const address = await createAddressUseCase.execute(
      defaultAddress as IAddress
    );
    const updatedAddress = await updateAddressUseCase.execute(address.id, {
      street: 'Updated Street',
    });

    expect(updatedAddress?.street).toBe('Updated Street');
    expect(updatedAddress?.street).not.toBe(defaultAddress.street);
  });

  it('should return null when updating a non-existent address', async () => {
    const result = await updateAddressUseCase.execute('non-existent-id', {
      street: 'Non-existent Street',
    });

    expect(result).toBeNull();
  });

  it('should delete an address', async () => {
    const address = await createAddressUseCase.execute(
      defaultAddress as IAddress
    );
    const isDeleted = await deleteAddressUseCase.execute(address.id);

    expect(isDeleted).toBe(true);

    const addresses = await findAllAddressesUseCase.execute();
    expect(addresses.length).toBe(0);
  });

  it('should return false when deleting a non-existent address', async () => {
    const isDeleted = await deleteAddressUseCase.execute('non-existent-id');
    expect(isDeleted).toBe(false);
  });
});
