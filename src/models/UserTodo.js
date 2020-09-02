import connection from '../db';
import snakeize from 'snakeize';
import camelize from 'camelize';

const table = 'user_todos';

export async function getAllTodos(userId) {
  const data = await connection
    .select('id', 'todo_text', 'is_completed', 'is_active', 'created_at')
    .from(table)
    .where('user_id', userId);

  return camelize(data);
}

export async function getTodoById(userId, todoId) {
  const data = await connection
    .select('id', 'todo_text', 'is_completed', 'is_active', 'created_at')
    .from(table)
    .where({ 'user_id': userId, 'id': todoId });

  return data[0] ? camelize(data[0]) : null;
}
