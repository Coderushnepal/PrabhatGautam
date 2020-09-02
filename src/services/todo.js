import logger from '../utils/logger';
import { verifyUser } from '../services/user';
import * as UserTodo from '../models/UserTodo';
import NotFoundError from '../utils/NotFoundError';

/**
 * Get all todos for a user.
 *
 * @param userId
 */
export async function getAllTodos(userId) {
  await verifyUser(userId);

  logger.info(`Getting list of todos for userId ${userId}`);

  const data = await UserTodo.getAllTodos(userId);

  return {
    data,
    message: `List of todos for userId ${userId}`
  }
}

/**
 * Get specific todo by id for a user.
 *
 * @param userId
 * @param todoId
 */
export async function getTodoById(userId, todoId) {
  await verifyUser(userId);

  logger.info(`Getting todoId ${todoId} for userId ${userId}`);

  const data = await UserTodo.getTodoById(userId, todoId);

  if (!data) {
    logger.error(`Cannot find todoId ${todoId} for userId ${userId}`);

    throw new NotFoundError(`Cannot find todoId ${todoId} for userId ${userId}`);
  }

  return {
    data,
    message: `Todo details for todoId ${todoId} and userId ${userId}`
  }
}
