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
const firestore_1 = require("firebase-admin/firestore");
class FirestoreRepository {
    constructor(app, collection) {
        this._getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const doc = yield this._collectionRef.doc(id).get();
            return doc.data() || null;
        });
        this._findAll = () => __awaiter(this, void 0, void 0, function* () {
            const querySnapshot = yield this._collectionRef.get();
            const secondsToMilliseconds = (seconds) => seconds * 1000;
            return querySnapshot.docs.reduce((previous, doc) => {
                const data = doc.data();
                Object.entries(data).forEach(([key, value]) => {
                    if (value === null || value === void 0 ? void 0 : value._seconds) {
                        data[key] = new Date(secondsToMilliseconds(value._seconds));
                    }
                });
                return Object.assign(Object.assign({}, previous), { [doc.id]: data });
            }, {});
        });
        this._set = (id, data) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this._collectionRef.doc(id).set(data);
            return result.writeTime !== null;
        });
        this._add = (data) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this._collectionRef.add(data);
            return result.id;
        });
        this._update = (id, data) => __awaiter(this, void 0, void 0, function* () {
            yield this._collectionRef.doc(id).update(data);
        });
        this._delete = (id) => __awaiter(this, void 0, void 0, function* () {
            yield this._collectionRef.doc(id).delete();
        });
        const firestore = (0, firestore_1.getFirestore)(app);
        this._collectionRef = firestore.collection(collection);
    }
}
exports.default = FirestoreRepository;
