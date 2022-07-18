"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger_1 = require("../../core/driven-adapters/logger");
const correlator_1 = require("./correlator");
const config = {
    key: process.env.LOGGER_API_KEY || '',
    options: {
        app: process.env.APP_NAME || '',
        env: process.env.ENV || '',
    },
};
exports.logger = new logger_1.Logger(correlator_1.correlator, config);
//# sourceMappingURL=logger.js.map