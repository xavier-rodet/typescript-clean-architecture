import { LogOptions } from '@logdna/logger';
import { ICorrelator, ILogger } from '../core/app/services';
export declare type LoggerConfig = {
    key: string;
    options: LogOptions;
};
export declare class Logger implements ILogger {
    private correlator;
    private config;
    private logger;
    constructor(correlator: ICorrelator, config: LoggerConfig);
    log(...args: unknown[]): void;
    trace(...args: unknown[]): void;
    debug(...args: unknown[]): void;
    info(...args: unknown[]): void;
    warn(...args: unknown[]): void;
    error(...args: unknown[]): void;
    private getOverridedOptions;
}
