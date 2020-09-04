import logger from '../utils/logger';
import * as User from '../models/User';
import { generateToken } from '../utils/jwt';
import { hash, compare } from '../utils/crypt';
import NotFoundError from '../utils/NotFoundError';
import * as UserSession from '../models/UserSession';
import BadRequestError from '../utils/BadRequestError';

/**
 * Create a user.
 *
 * @param params
 */
export async function createUser(params) {
  const existingUser = await User.getUserByEmail(params.email);

  if (existingUser) {
    logger.error('There is already an existing user with this email');

    throw new BadRequestError('There is already an existing user with this email');
  }

  const hashedPassword = hash(params.password);

  const userInsertData = await User.create({ ...params, password: hashedPassword });

  return {
    data: userInsertData,
    message: 'New user added successfully'
  };
}

/**
 * Verify email and password and login.
 *
 * @param params
 */
export async function login(params) {
  const { email, password } = params;

  const user = await User.getUserByEmail(email);

  if (!user) {
    logger.error('Invalid login credentials');

    throw new BadRequestError('Invalid login credentials');
  }

  const isPasswordValid = compare(password, user.password);

  if (!isPasswordValid) {
    logger.error('Invalid login credentials');

    throw new BadRequestError('Invalid login credentials');
  }

  const token = generateToken({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  });

  await UserSession.saveToken(user.id, token);

  user.password = undefined;

  return {
    data: {
      user,
      token
    },
    message: 'Logged in successfully'
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
