import logger from '../utils/logger';
import usersJson from '../data/users';
import * as User from '../models/User';
import NotFoundError from '../utils/NotFoundError';
import * as UserPhoneNumber from '../models/UserPhoneNumber';

/**
 * Get all users.
 */
export async function getAllUsers() {
  logger.info('Fetching all users');
  const data = await User.getAll();

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

  const result = await User.getById(userId);

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
export async function createUser(params) {
  const { firstName, lastName, email, password, phoneNumbers} = params;
  const userInsertData = await User.create({
    firstName,
    lastName,
    email,
    password
  });

  const insertDataForPhoneNumbers = phoneNumbers.map(phone => ({
    userId: userInsertData.id,
    phoneNumber: phone.number,
    type: phone.type
  }));

  const phoneNumberInsertedData = await UserPhoneNumber.add(insertDataForPhoneNumbers);

  return {
    data: params,
    message: "New user added successfully"
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