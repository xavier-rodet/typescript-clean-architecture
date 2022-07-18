"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationError = void 0;
class AuthenticationError extends Error {
    constructor(reason) {
        let message = 'Authentication error';
        if (reason) {
            message += `: ${reason}`;
        }
        super(message);
        Object.setPrototypeOf(this, AuthenticationError.prototype);
    }
}
exports.AuthenticationError = AuthenticationError;
//# sourceMappingURL=authentication-error.js.map