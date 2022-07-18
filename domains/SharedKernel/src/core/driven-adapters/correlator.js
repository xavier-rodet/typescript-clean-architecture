"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Correlator = void 0;
const correlation_id_1 = __importDefault(require("correlation-id"));
class Correlator {
    bindId(work, id) {
        return id ? correlation_id_1.default.bindId(id, work) : correlation_id_1.default.bindId(work);
    }
    withId(work, id) {
        id ? correlation_id_1.default.withId(id, work) : correlation_id_1.default.withId(work);
    }
    getId() {
        return correlation_id_1.default.getId();
    }
}
exports.Correlator = Correlator;
//# sourceMappingURL=correlator.js.map