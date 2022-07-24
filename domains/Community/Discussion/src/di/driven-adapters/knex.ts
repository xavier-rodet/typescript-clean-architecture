import Knex from 'knex';

import dbConfig from '@/core/driven-adapters/repositories/config';

export const knex = Knex(dbConfig);
