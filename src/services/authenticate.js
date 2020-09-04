import logger from '../utils/logger';
import * as UserSession from '../models/UserSession';
import UnauthorizedError from '../utils/UnauthorizedError';

export async function verifyToken(userId, token) {
  if (!token) {
    logger.error(`No token provided`);

    throw new UnauthorizedError(`No token provided`);
  }

  const session = await UserSession.get({
    userId,
    token,
    isActive: true
  });

  if (!session || (session && session.userId !== userId)) {
    logger.error(`Invalid token or session not maintained`);

    throw new UnauthorizedError(`Invalid token or session not maintained`);
  }
}
