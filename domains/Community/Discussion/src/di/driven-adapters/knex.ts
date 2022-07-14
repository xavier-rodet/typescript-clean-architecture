import Knex from 'knex';

import dbConfig from '../../config/db';

export const db = Knex(dbConfig);
