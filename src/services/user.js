import logger from '../utils/logger';
import * as User from '../models/User';
import NotFoundError from '../utils/NotFoundError';
import BadRequestError from '../utils/BadRequestError';

/**
 * Create a user
 * 
 * @param params 
 */
export async function createUser(params) {
  const existingUser = await User.getUserByEmail(params.email);

  if (existingUser) {
    logger.error('There is already an existing user with this email');

    throw new BadRequestError('There is already an existing user with this email');
  }

  const userInsertData = await User.create(params);

  return {
    data: userInsertData,
    message: "New user added successfully"
  };
}

/**
 * Get user by id.
 *
 * @param userId
 */
export async function verifyUser(userId) {
  logger.info(`Verifying if userId ${userId} exists`);

  const user = await User.getUserById(userId);

  if (!user) {
    logger.error(`Cannot find user with id ${userId}`);

    throw new NotFoundError(`Cannot find user with id ${userId}`);
  }
}