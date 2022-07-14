import LogDNA, { LogLevel, LogOptions } from '@logdna/logger';
import { ICorrelator, ILogger } from '../core/app/services';

export type LoggerConfig = {
  key: string;
  options: LogOptions;
};

export class Logger implements ILogger {
  private logger: LogDNA.Logger;

  public constructor(
    private correlator: ICorrelator,
    private config: LoggerConfig
  ) {
    this.logger = LogDNA.createLogger(this.config.key, this.config.options);
    this.correlator = correlator;
  }

  public log(...args: unknown[]): void {
    this.logger.log(args, this.getOverridedOptions());
  }
  public trace(...args: unknown[]): void {
    this.logger.log(args, this.getOverridedOptions(LogLevel.trace));
  }
  public debug(...args: unknown[]): void {
    this.logger.log(args, this.getOverridedOptions(LogLevel.debug));
  }
  public info(...args: unknown[]): void {
    this.logger.log(args, this.getOverridedOptions(LogLevel.info));
  }
  public warn(...args: unknown[]): void {
    this.logger.log(args, this.getOverridedOptions(LogLevel.warn));
  }
  public error(...args: unknown[]): void {
    this.logger.log(args, this.getOverridedOptions(LogLevel.error));
  }

  private getOverridedOptions(level?: LogLevel): LogDNA.LogOptions {
    return {
      level,
      meta: {
        correlation: this.correlator.getId(),
      },
    };
  }
}
