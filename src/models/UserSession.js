import connection from '../db';
import snakeize from 'snakeize';
import camelize from 'camelize';

const table = 'user_sessions';

export async function saveToken(userId, token) {
  return connection.insert({ user_id: userId, token: token }).into(table);
}

export async function get(params) {
  const [data] = await connection.select('*').from(table).where(snakeize(params));

  return data ? camelize(data) : null;
}
