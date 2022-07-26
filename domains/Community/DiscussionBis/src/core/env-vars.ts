import { ENV } from '@/shared-kernel/core/env';

// This file will help us to default all env vars, and to keep track of all env vars used by our application (never use process.env anywhere else in the app!!!!)
// TODO: move this in /frameworks (where will belongs: presentation (driving adapters) & infrastrucutre (driven adapters))
export const ENV_VARS = {
  ENV: process.env.ENV || ENV.PROD,
  DB: {
    HOST: process.env.DB_HOST || '',
    PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 0,
    USER: process.env.DISCUSSION_DB_USER || '',
    PWD: process.env.DISCUSSION_DB_PWD || '',
  },
  API: {
    PORT: process.env.DISCUSSION_API_PORT
      ? parseInt(process.env.DISCUSSION_API_PORT)
      : 0,
    CORS_ALLOW_ORIGIN: process.env.API_CORS_ALLOW_ORIGIN || '',
  },
  BROKER: {
    HOST: process.env.BROKER_HOST || '',
    PORT: process.env.BROKER_PORT ? parseInt(process.env.BROKER_PORT) : 0,
  },
  LOGGER: {
    API_KEY: process.env.LOGGER_API_KEY || '',
  },
};
