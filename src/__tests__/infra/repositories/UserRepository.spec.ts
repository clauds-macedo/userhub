import { MockUserRepository } from '@/__tests__/__mocks__/MockUserRepository';
import { generateFakeAddress } from '@/__tests__/fakes/generateFakeAddress';
import { generateFakeUser } from '@/__tests__/fakes/generateFakeUser';
import { ICreateUserDTO } from '@/domain/dtos/IUserDTO';
import { CreateUserUseCase } from '@/domain/usecases/CreateUserUseCase';
import { DeleteUserUseCase } from '@/domain/usecases/DeleteUserUseCase';
import { FindAllUsersUseCase } from '@/domain/usecases/FindAllUsersUseCase';
import { GetUserByIdUseCase } from '@/domain/usecases/GetUserUseCase';
import { UpdateUserUseCase } from '@/domain/usecases/UpdateUserUseCase';

const defaultUser: ICreateUserDTO = {
  email: 'email@test.me',
  name: 'Claudemir',
  password: '123123',
};

const userRepository = new MockUserRepository();

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let deleteUserUseCase: DeleteUserUseCase;
  let findAllUsersUseCase: FindAllUsersUseCase;
  let getUserByIdUseCase: GetUserByIdUseCase;
  let updateUserUseCase: UpdateUserUseCase;
  beforeAll(() => {
    createUserUseCase = new CreateUserUseCase(userRepository);
    findAllUsersUseCase = new FindAllUsersUseCase(userRepository);
    deleteUserUseCase = new DeleteUserUseCase(userRepository);
    getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
    updateUserUseCase = new UpdateUserUseCase(userRepository);
  });
  it('should create a new user', async () => {
    const user = await createUserUseCase.execute(defaultUser);

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Claudemir');
    expect(user.addresses).toEqual([]);
    expect(user.password).toBe('123123');
    expect(user).toHaveProperty('createdAt');
    expect(user.email).toBe('email@test.me');
  });

  it('should read all user', async () => {
    const createUsersPromises = Array.from({ length: 4 }).map(() => {
      return createUserUseCase.execute(generateFakeUser());
    });
    await Promise.all(createUsersPromises);

    const allUsers = await findAllUsersUseCase.execute();

    expect(allUsers).toBeDefined();
    expect(allUsers.length).toBe(5);
  });

  it('should delete an user', async () => {
    const user = await createUserUseCase.execute(defaultUser);
    const foundUser = await getUserByIdUseCase.execute(user.id);

    expect(foundUser).toBeDefined();

    await deleteUserUseCase.execute(user.id);
    const foundUserAfterDelete = await getUserByIdUseCase.execute(user.id);

    expect(foundUserAfterDelete).toBe(null);
  });

  it('should update a user', async () => {
    const fakeAddress = generateFakeAddress();
    const user = await createUserUseCase.execute(defaultUser);

    const updatedUser = await updateUserUseCase.execute(user.id, {
      name: 'Claudemir2',
      email: 'updated.email@test.me',
    });
    updatedUser?.addAddress(fakeAddress);

    expect(updatedUser).toBeDefined();
    expect(updatedUser?.id).toBe(user.id);
    expect(updatedUser?.name).toBe('Claudemir2');
    expect(updatedUser?.email).toBe('updated.email@test.me');
    expect(updatedUser?.addresses).toBeDefined();
  });
});
