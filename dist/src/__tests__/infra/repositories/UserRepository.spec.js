"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const MockUserRepository_1 = require("@/__tests__/__mocks__/MockUserRepository");
const generateFakeAddress_1 = require("@/__tests__/fakes/generateFakeAddress");
const generateFakeUser_1 = require("@/__tests__/fakes/generateFakeUser");
const CreateUserUseCase_1 = require("@/domain/usecases/CreateUserUseCase");
const DeleteUserUseCase_1 = require("@/domain/usecases/DeleteUserUseCase");
const FindAllUsersUseCase_1 = require("@/domain/usecases/FindAllUsersUseCase");
const GetUserUseCase_1 = require("@/domain/usecases/GetUserUseCase");
const UpdateUserUseCase_1 = require("@/domain/usecases/UpdateUserUseCase");
const defaultUser = {
    email: 'email@test.me',
    name: 'Claudemir',
    password: '123123',
};
const userRepository = new MockUserRepository_1.MockUserRepository();
describe('CreateUserUseCase', () => {
    let createUserUseCase;
    let deleteUserUseCase;
    let findAllUsersUseCase;
    let getUserByIdUseCase;
    let updateUserUseCase;
    beforeAll(() => {
        createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(userRepository);
        findAllUsersUseCase = new FindAllUsersUseCase_1.FindAllUsersUseCase(userRepository);
        deleteUserUseCase = new DeleteUserUseCase_1.DeleteUserUseCase(userRepository);
        getUserByIdUseCase = new GetUserUseCase_1.GetUserByIdUseCase(userRepository);
        updateUserUseCase = new UpdateUserUseCase_1.UpdateUserUseCase(userRepository);
    });
    it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield createUserUseCase.execute(defaultUser);
        expect(user).toHaveProperty('id');
        expect(user.name).toBe('Claudemir');
        expect(user.addresses).toEqual([]);
        expect(user.password).toBe('123123');
        expect(user).toHaveProperty('createdAt');
        expect(user.email).toBe('email@test.me');
    }));
    it('should read all user', () => __awaiter(void 0, void 0, void 0, function* () {
        const createUsersPromises = Array.from({ length: 4 }).map(() => {
            return createUserUseCase.execute((0, generateFakeUser_1.generateFakeUser)());
        });
        yield Promise.all(createUsersPromises);
        const allUsers = yield findAllUsersUseCase.execute();
        expect(allUsers).toBeDefined();
        expect(allUsers.length).toBe(5);
    }));
    it('should delete an user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield createUserUseCase.execute(defaultUser);
        const foundUser = yield getUserByIdUseCase.execute(user.id);
        expect(foundUser).toBeDefined();
        yield deleteUserUseCase.execute(user.id);
        const foundUserAfterDelete = yield getUserByIdUseCase.execute(user.id);
        expect(foundUserAfterDelete).toBe(null);
    }));
    it('should update a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const fakeAddress = (0, generateFakeAddress_1.generateFakeAddress)();
        const user = yield createUserUseCase.execute(defaultUser);
        const updatedUser = yield updateUserUseCase.execute(user.id, {
            name: 'Claudemir2',
            email: 'updated.email@test.me',
        });
        updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.addAddress(fakeAddress);
        expect(updatedUser).toBeDefined();
        expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.id).toBe(user.id);
        expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.name).toBe('Claudemir2');
        expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.email).toBe('updated.email@test.me');
        expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.addresses).toBeDefined();
    }));
});
