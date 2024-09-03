import { IAddressRepository } from '@/domain/repositories/IAddressRepository';
import { CreateAddressUseCase } from '@/domain/usecases/CreateAddressUseCase';
import { DeleteAddressUseCase } from '@/domain/usecases/DeleteAddressUseCase';
import { FindAllAddressesUseCase } from '@/domain/usecases/FindAllAddressesUseCase';
import { FindAddressesByUserIdUseCase } from '@/domain/usecases/GetAddressesUseCase';
import { UpdateAddressUseCase } from '@/domain/usecases/UpdateAddressUseCase';
import { MongooseAddressRepository } from '@/infra/repositories/MongooseAddressRepository';

const addressRepository: IAddressRepository = new MongooseAddressRepository();

export const createAddressFactory = new CreateAddressUseCase(addressRepository);
export const getAllAddressesFactory = new FindAllAddressesUseCase(
  addressRepository
);
export const findAddressesByUserIdFactory = new FindAddressesByUserIdUseCase(
  addressRepository
);
export const updateAddressFactory = new UpdateAddressUseCase(addressRepository);
export const deleteAddressFactory = new DeleteAddressUseCase(addressRepository);
