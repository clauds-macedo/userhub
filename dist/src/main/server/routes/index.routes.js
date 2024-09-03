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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRouter = void 0;
const generateFakeUser_1 = require("@/__tests__/fakes/generateFakeUser");
const firebase_1 = require("@/infra/config/firebase");
const FirestoreRepository_1 = __importDefault(require("@/infra/repositories/FirestoreRepository"));
const express_1 = require("express");
exports.MainRouter = (0, express_1.Router)();
exports.MainRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(process.env.DATABASE_PROJECT_ID);
    const userRepository = new FirestoreRepository_1.default(firebase_1.userHubFirebaseApp, 'users');
    const user = yield userRepository._add((0, generateFakeUser_1.generateFakeUser)());
    res.json({ user });
}));
