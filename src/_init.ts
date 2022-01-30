/***** IMPORTANT: this code must be executed BEFORE anything else in our application *****/
process.env.ENV = process.env.ENV || 'production';
process.env.NODE_ENV = process.env.ENV;

import { logger } from './di/libraries';

const init = (): void => logger.init();

export { init };
