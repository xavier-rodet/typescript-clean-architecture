import { resolve } from 'path';

export type ApiConfig = {
  port: number;
  env: string;
  definitionsPath: string;
  corsAllowOrigin: string;
};

export const apiConfig: ApiConfig = {
  port: process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 8080,
  env: process.env.ENV || '',
  definitionsPath: resolve(__dirname, '/../../dist/swagger.json'),
  corsAllowOrigin: process.env.CORS_ALLOW_ORIGIN || '',
};
