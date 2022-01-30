import { resolve } from 'path';

export const config = {
  port: process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 0,
  env: process.env.ENV || '',
  definitionsPath: resolve(process.cwd(), 'dist/swagger.json'),
  corsAllowOrigin: process.env.CORS_ALLOW_ORIGIN || '',
};
