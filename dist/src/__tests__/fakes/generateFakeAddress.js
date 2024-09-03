"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFakeAddress = void 0;
const generateFakeAddress = () => {
    return {
        id: Math.floor(Math.random() * 1000),
        userId: 1,
        street: `Fake Street ${Math.floor(Math.random() * 100)}`,
        city: 'Faketown',
    };
};
exports.generateFakeAddress = generateFakeAddress;
