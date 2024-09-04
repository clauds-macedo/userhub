import { MockAddressRepository } from '@/__tests__/__mocks__/MockAddressRepository';
import { generateFakeAddress } from '@/__tests__/fakes/generateFakeAddress';
import { IAddress } from '@/domain/entities/Address';

const defaultAddress: Partial<IAddress> = {
  userId: '12345',
  street: 'Rua 8888888',
  city: 'Maceió',
};

describe('MockAddressRepository', () => {
  let addressRepository: MockAddressRepository;

  beforeEach(() => {
    addressRepository = new MockAddressRepository();
  });

  it('should create a new address', async () => {
    const address = await addressRepository.create(defaultAddress);

    expect(address).toHaveProperty('id');
    expect(address.userId).toBe(defaultAddress.userId);
    expect(address.street).toBe(defaultAddress.street);
    expect(address.city).toBe(defaultAddress.city);
  });

  it('should find addresses by userId', async () => {
    const address1 = await addressRepository.create(defaultAddress);
    const address2 = await addressRepository.create({
      ...generateFakeAddress(),
      userId: '12345',
    });

    const addresses = await addressRepository.findByUserId('12345');

    expect(addresses.length).toBe(2);
    expect(addresses[0].street).toBe(address1.street);
    expect(addresses[1].street).toBe(address2.street);
  });

  it('should return all addresses', async () => {
    await addressRepository.create(defaultAddress);
    await addressRepository.create(generateFakeAddress());

    const allAddresses = await addressRepository.findAll();
    expect(allAddresses.length).toBe(2);
  });

  it('should update an address', async () => {
    const address = await addressRepository.create(defaultAddress);
    const updatedAddress = await addressRepository.update(address.id, {
      street: 'Updated Street',
    });

    expect(updatedAddress?.street).toBe('Updated Street');
    expect(updatedAddress?.street).not.toBe(defaultAddress.street);
  });

  it('should return null when updating a non-existent address', async () => {
    const result = await addressRepository.update('non-existent-id', {
      street: 'Non-existent Street',
    });

    expect(result).toBeNull();
  });

  it('should delete an address', async () => {
    const address = await addressRepository.create(defaultAddress);
    const isDeleted = await addressRepository.delete(address.id);

    expect(isDeleted).toBe(true);

    const addresses = await addressRepository.findAll();
    expect(addresses.length).toBe(0);
  });

  it('should return false when deleting a non-existent address', async () => {
    const isDeleted = await addressRepository.delete('non-existent-id');
    expect(isDeleted).toBe(false);
  });
});
