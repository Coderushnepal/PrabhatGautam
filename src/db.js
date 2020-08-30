import Knex from 'knex';

const dbConfig = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'users_db'
  }
};

const connection = Knex(dbConfig);

export default connection;