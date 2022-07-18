"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const logger_1 = __importStar(require("@logdna/logger"));
class Logger {
    constructor(correlator, config) {
        this.correlator = correlator;
        this.config = config;
        this.logger = logger_1.default.createLogger(this.config.key, this.config.options);
        this.correlator = correlator;
    }
    log(...args) {
        this.logger.log(args, this.getOverridedOptions());
    }
    trace(...args) {
        this.logger.log(args, this.getOverridedOptions(logger_1.LogLevel.trace));
    }
    debug(...args) {
        this.logger.log(args, this.getOverridedOptions(logger_1.LogLevel.debug));
    }
    info(...args) {
        this.logger.log(args, this.getOverridedOptions(logger_1.LogLevel.info));
    }
    warn(...args) {
        this.logger.log(args, this.getOverridedOptions(logger_1.LogLevel.warn));
    }
    error(...args) {
        this.logger.log(args, this.getOverridedOptions(logger_1.LogLevel.error));
    }
    getOverridedOptions(level) {
        return {
            level,
            meta: {
                correlation: this.correlator.getId(),
            },
        };
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map