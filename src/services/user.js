import connection from '../db';
import logger from '../utils/logger';
import usersJson from '../data/users';
import NotFoundError from '../utils/NotFoundError';

/**
 * Get all users.
 */
export async function getAllUsers() {
  logger.info('Fetching all users');
  const data = await connection.select('*').from('users');

  return {
    data,
    message: 'List of all users'
  };
}

/**
 * Get user by id
 *
 * @param userId 
 */
export async function getUserById(userId) {
  logger.info(`Fetching user information with id ${userId}`);

  const [result] = await connection.select('*').from('users').where('id', userId);

  if(!result) {
    logger.error(`Cannot find the user with id ${userId}`);

    throw new NotFoundError(`Cannot find the user with id ${userId}`);
  }

  return {
    data: result,
    message: `Information about userId ${userId}`
  };
}

/**
 * Create a user
 * 
 * @param params 
 */
export function createUser(params) {
  // Finding the maximum id from existing JSON file
  const maxId = usersJson.reduce((acc, cur) => {
    return cur.id > acc ? cur.id : acc;
  }, 0);

  usersJson.push({
    id: maxId + 1,
    ...params
  })

  return {
    message: "New user added successfully",
    data: {
      id: maxId + 1,
      ...params
    }
  };
}

/**
 * Delete a user
 * @param userId 
 */
export function deleteUser(userId) {
  const doesUserExist = usersJson.find(user => user.id === userId);

  if(!doesUserExist) {
    logger.error(`Cannot find user with id ${userId}`);
    
    throw new Error(`Cannot find user with id ${userId}`);
  }

  const updatedUsersList = usersJson.filter(user => user.id !== userId);

  fs.writeFileSync(usersJsonPath, JSON.stringify(updatedUsersList, null, 2));

  return {
    message: "Deleted user with id " + userId
  };
}

/**
 * Update a user
 * 
 * @param userId 
 * @param params 
 */
export function updateUser(userId, params) {
  const updatedJson = usersJson.map(user => {
    if(user.id === userId) {
      return {
        ...user,
        ...params
      };
    }

    return user;
  });

  fs.writeFileSync(usersJsonPath, JSON.stringify(updatedJson, null, 2));

  return {
    message: "Updated user with id " + userId
  };
}