import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { CreateUserUseCase } from '@/domain/usecases/CreateUserUseCase';
import { DeleteUserUseCase } from '@/domain/usecases/DeleteUserUseCase';
import { FindAllUsersUseCase } from '@/domain/usecases/FindAllUsersUseCase';
import { FindUserByEmailUseCase } from '@/domain/usecases/FindUserByEmailUseCase';
import { GetUserByIdUseCase } from '@/domain/usecases/GetUserUseCase';
import { UpdateUserUseCase } from '@/domain/usecases/UpdateUserUseCase';
import { MongooseUserRepository } from '@/infra/repositories/MongooseUserRepository';

const userRepository: IUserRepository = new MongooseUserRepository();

export const createUserFactory = new CreateUserUseCase(userRepository);
export const getUserByIdFactory = new GetUserByIdUseCase(userRepository);
export const findAllUsersFactory = new FindAllUsersUseCase(userRepository);
export const deleteUserFactory = new DeleteUserUseCase(userRepository);
export const updateUserFactory = new UpdateUserUseCase(userRepository);
export const findByEmailFactory = new FindUserByEmailUseCase(userRepository);
