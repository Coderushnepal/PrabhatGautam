import Knex from 'knex';

import { dbConfig } from './knexfile';

const connection = Knex(dbConfig);

export default connection;