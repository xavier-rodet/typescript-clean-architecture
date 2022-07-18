"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryError = void 0;
class RepositoryError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, RepositoryError.prototype);
    }
}
exports.RepositoryError = RepositoryError;
//# sourceMappingURL=repository-error.js.map