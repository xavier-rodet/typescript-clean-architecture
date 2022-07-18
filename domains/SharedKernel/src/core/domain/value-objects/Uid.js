"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uid = void 0;
const utils_1 = require("@ts-extension/utils");
const errors_1 = require("../errors");
class Uid {
    constructor(value) {
        if (!utils_1.UidUtil.validate(value)) {
            throw new errors_1.ValidationError('Uid is invalid');
        }
        this._value = value;
    }
    get value() {
        return this._value;
    }
}
exports.Uid = Uid;
//# sourceMappingURL=Uid.js.map