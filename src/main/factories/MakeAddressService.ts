import { IAddressRepository } from '@/domain/repositories/IAddressRepository';
import { CreateAddressUseCase } from '@/domain/usecases/CreateAddressUseCase';
import { DeleteAddressUseCase } from '@/domain/usecases/DeleteAddressUseCase';
import { GetAddressByIdUseCase } from '@/domain/usecases/GetAddressByIdUseCase';
import { FindAddressesByUserIdUseCase } from '@/domain/usecases/GetAddressesUseCase';
import { UpdateAddressUseCase } from '@/domain/usecases/UpdateAddressUseCase';
import { MongooseAddressRepository } from '@/infra/repositories/MongooseAddressRepository';

const addressRepository: IAddressRepository = new MongooseAddressRepository();

export const createAddressFactory = new CreateAddressUseCase(addressRepository);
export const getAddressByIdFactory = new GetAddressByIdUseCase(
  addressRepository
);
export const findAddressesByUserIdFactory = new FindAddressesByUserIdUseCase(
  addressRepository
);
export const updateAddressFactory = new UpdateAddressUseCase(addressRepository);
export const deleteAddressFactory = new DeleteAddressUseCase(addressRepository);
