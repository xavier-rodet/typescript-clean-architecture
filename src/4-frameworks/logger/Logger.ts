import { once } from "events";
import LogDNA from "@logdna/logger";
import { ILogger } from ".";
import { ICorrelator } from "@frameworks/correlator";
import { IConfig } from "./_definitions/IConfig";

export class Logger implements ILogger {
  private logger: LogDNA.Logger;
  private correlator: ICorrelator;

  constructor(config: IConfig, correlator: ICorrelator) {
    this.logger = LogDNA.createLogger(config.key, config.options);
    this.correlator = correlator;
  }

  public init(): void {
    this.overrideConsole();
    this.logger.on("error", console.error);
    process.on("uncaughtException", console.error);
    process.on("unhandledRejection", console.error);
    this.handleShutdown();
  }

  private formatMetaWithCorrelation(args: unknown[]): LogDNA.LogOptions {
    let data;
    if (args.length > 0) {
      data = 1 === args.length ? args[0] : args;
    }
    const correlation = this.correlator.getId();

    let logOptions = {};
    if (data || correlation) {
      let meta = {};
      if (data) meta = { ...meta, data };
      if (correlation) meta = { ...meta, correlation };
      logOptions = { meta };
    }

    return logOptions;
  }

  private overrideConsole(): void {
    const {
      log: consoleLog,
      trace: consoleTrace,
      debug: consoleDebug,
      info: consoleInfo,
      warn: consoleWarn,
      error: consoleError,
    } = console;

    console.log = (message: string, ...args: unknown[]) => {
      this.logger.log(message, this.formatMetaWithCorrelation(args));
      consoleLog(message, ...args);
    };

    console.trace = (message: string, ...args: unknown[]) => {
      this.logger.trace(message, this.formatMetaWithCorrelation(args));
      consoleTrace(message, ...args);
    };

    console.debug = (message: string, ...args: unknown[]) => {
      this.logger.debug(message, this.formatMetaWithCorrelation(args));
      consoleDebug(message, ...args);
    };

    console.info = (message: string, ...args: unknown[]) => {
      this.logger.info(message, this.formatMetaWithCorrelation(args));
      consoleInfo(message, ...args);
    };

    console.warn = (message: string, ...args: unknown[]) => {
      this.logger.warn(message, this.formatMetaWithCorrelation(args));
      consoleWarn(message, ...args);
    };

    console.error = (message: string, ...args: unknown[]) => {
      this.logger.error(message, this.formatMetaWithCorrelation(args));
      consoleError(message, ...args);
    };
  }

  private handleShutdown(): void {
    const shutdown = async () => {
      await once(this.logger, "cleared");
      console.info("App has shut down gracefully");
      process.exit();
    };

    const onSignal = (signal: NodeJS.Signals) => {
      console.warn(`Received signal "${signal}", shutting down`);
      shutdown();
    };

    process.on("SIGTERM", onSignal);
    process.on("SIGINT", onSignal);
  }
}
