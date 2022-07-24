import { ENV_VARS } from '@/core/env-vars';
import { resolve } from 'path';

export type ApiConfig = {
  env: string;
  port: number;
  corsAllowOrigin: string;
  definitionsPath: string;
};

export const apiConfig: ApiConfig = {
  env: ENV_VARS.ENV,
  port: ENV_VARS.API.PORT,
  corsAllowOrigin: ENV_VARS.API.CORS_ALLOW_ORIGIN,
  definitionsPath: resolve(__dirname, '/../../dist/swagger.json'),
};
