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
exports.MockUserRepository = void 0;
const User_1 = require("@/domain/entities/User");
class MockUserRepository {
    constructor() {
        this.users = [];
        this.nextId = 1;
    }
    create(userDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User_1.User(Object.assign(Object.assign({}, userDTO), { createdAt: new Date(), id: this.nextId++, addresses: [] }));
            this.users.push(user);
            return user;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users.find((user) => user.id === id) || null;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users;
        });
    }
    update(id, userDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findById(id);
            if (!user) {
                return null;
            }
            if (userDTO.name !== undefined)
                user.name = userDTO.name;
            if (userDTO.email !== undefined)
                user.email = userDTO.email;
            if (userDTO.password !== undefined)
                user.password = userDTO.password;
            return user;
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.users.findIndex((user) => user.id === id);
            if (index === -1)
                return false;
            this.users.splice(index, 1);
            return true;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users.find((user) => user.email === email) || null;
        });
    }
}
exports.MockUserRepository = MockUserRepository;
