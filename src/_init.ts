/***** IMPORTANT: this code must be executed BEFORE anything else in our application *****/
process.env.ENV = process.env.ENV || "production";
process.env.NODE_ENV = process.env.ENV;
import { iocAppContainer } from "@frameworks/ioc";
import { ILogger, Logger } from "@frameworks/logger";

const logger: ILogger = iocAppContainer[Logger.name];

const init = (): void => logger.init();

export { init };
