"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(params) {
        Object.assign(this, params);
    }
    addAddress(address) {
        var _a;
        (_a = this.addresses) === null || _a === void 0 ? void 0 : _a.push(address);
    }
}
exports.User = User;
