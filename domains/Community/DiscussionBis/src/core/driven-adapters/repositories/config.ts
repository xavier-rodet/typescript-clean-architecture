import { ENV_VARS } from '@/core/env-vars';
import { ENV } from '@/shared-kernel/core/env';
import { Knex } from 'knex';

export const dbConfig: Knex.Config = {
  client: 'postgresql',
  connection: {
    host: ENV_VARS.DB.HOST,
    port: ENV_VARS.DB.PORT,
    database: 'discussion',
    user: ENV_VARS.DB.USER,
    password: ENV_VARS.DB.PWD,
    ssl: ENV.PROD === ENV_VARS.ENV ? { rejectUnauthorized: false } : false,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    // directory is relative to "knexfile" path set into package.json
    directory: './migrations',
  },
};

// mandatory for knex migration cmds to work
export default dbConfig;
