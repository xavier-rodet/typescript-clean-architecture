"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const utils_1 = require("@ts-extension/utils");
const constants_1 = require("../constants");
const value_objects_1 = require("../value-objects");
class User {
    constructor(props) {
        var _a, _b;
        this.id = (_a = props.id) !== null && _a !== void 0 ? _a : new value_objects_1.Uid(utils_1.UidUtil.generate());
        this.name = props.name;
        this.role = (_b = props.role) !== null && _b !== void 0 ? _b : constants_1.ERole.PLAYER;
        Object.freeze(this);
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map