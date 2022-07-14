import { Logger, LoggerConfig } from '../../core/driven-adapters/logger';
import { correlator } from './correlator';

const config: LoggerConfig = {
  key: process.env.LOGGER_API_KEY || '',
  options: {
    app: process.env.APP_NAME || '',
    env: process.env.ENV || '',
  },
};

export const logger = new Logger(correlator, config);
