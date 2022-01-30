import Knex from 'knex';
import { camelCase, snakeCase } from 'lodash';

export const config: Knex.Config = {
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    ssl:
      'production' === process.env.ENV ? { rejectUnauthorized: false } : false,
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

  /***** IMPORTANT: this will auto convert snake case fields (from db) into camel case (to js) because PostgreSQL is case insensitive */
  // see: https://knexjs.org/#Installation-post-process-response

  // Conversion for results (so we get camelCase fields as result)
  postProcessResponse: (result /* , queryContext */) => {
    if (Array.isArray(result)) {
      return result.map((row) => camelCaseFieldsName(row));
    } else {
      return camelCaseFieldsName(result);
    }
  },

  // Conversion for queries (so we can send camelCase fields as query)
  wrapIdentifier: (value, origImpl /* , queryContext */) =>
    origImpl(snakeCase(value)),
  /**********/
};

export const options = {
  ITEM_PER_PAGE: 30,
};

// mandatory for knex migration cmds to work
export default config;

/*****  Private methods *****/
function camelCaseFieldsName(row: any): any {
  if (row) {
    Object.entries(row).forEach(([key, value]) => {
      delete row[key];
      row[camelCase(key)] = value;
    });
  }

  return row;
}
