import Knex from 'knex';

import config from '../../infra/knex/config';

export const knex = Knex(config);
