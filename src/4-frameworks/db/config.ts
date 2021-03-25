import Knex from "knex";

const config: Knex.Config = {
  client: "postgresql",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    // directory is relative to "knexfile" path set into package.json
    directory: "../db/migrations",
  },
};

const options = {
  ITEM_PER_PAGE: 30,
};

export { config, options };

// mandatory for knex migration cmds to work
export default config;
