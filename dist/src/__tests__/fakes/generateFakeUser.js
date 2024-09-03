"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFakeUser = void 0;
const User_1 = require("@/domain/entities/User");
const generateFakeAddress_1 = require("./generateFakeAddress");
const generateFakeUser = (overrides) => {
    const defaultUser = {
        id: Math.floor(Math.random() * 1000),
        name: `User ${Math.floor(Math.random() * 100)}`,
        email: `user${Math.floor(Math.random() * 1000)}@example.com`,
        password: `password${Math.floor(Math.random() * 1000)}`,
        createdAt: new Date(),
        addresses: [(0, generateFakeAddress_1.generateFakeAddress)()],
    };
    return new User_1.User(Object.assign(Object.assign({}, defaultUser), overrides));
};
exports.generateFakeUser = generateFakeUser;
