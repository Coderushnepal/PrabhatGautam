import fs from 'fs';
import { Router } from 'express';

import logger from './utils/logger';
import usersJson from './data/users'l
import { validateUserCreation } from './schemas/user';
import { GET_USERS, GET_USER_BY_ID, CREATE_USER, DELETE_USER, UPDATE_USER } from './constants/endpoints';

const router = Router();

router.get('/', (request, response, next) => {  
  response.json({
    name: 'todo-api',
    version: '1.0.0'
  });
});

router.get(GET_USERS, (request, response, next) => {
  logger.info('Fetching all users');

  response.json(usersJson);
});

router.get(GET_USER_BY_ID, (request, response, next) => {
  const userId = +request.params.userId;
  logger.info(`Fetching user information with id ${userId}`);

  const requestedUser = usersJson.find(user => user.id === userId);

  if(!requestedUser) {
    logger.error(`Cannot find the user with id ${userId}`);

    response.json({
      message: "Cannot find the user with id " + userId
    })
  }

  response.json(requestedUser);
});

router.post(CREATE_USER, validateUserCreation, (request, response, next) => {
  const params = request.body;

  const maxId = usersJson.reduce((acc, cur) => {
    return cur.id > acc ? cur.id : acc;
  }, 0);

  usersJson.push({
    id: maxId + 1,
    ...params
  })

  response.json({
    message: "New user added successfully",
    data: {
      id: maxId + 1,
      ...params
    }
  });
});

router.delete(DELETE_USER, (request, response, next) => {
  const userId = +request.params.userId;
  const doesUserExist = usersJson.find(user => user.id === userId);

  if(!doesUserExist) {
    response.json({
      message: "Cannot find user with id " + userId
    })
  }

  const updatedUsersList = usersJson.filter(user => user.id !== userId);

  fs.writeFileSync(usersJsonPath, JSON.stringify(updatedUsersList, null, 2));

  response.json({
    message: "Deleted user with id " + userId
  });
});

router.put(UPDATE_USER, (request, response, next) => {
  const userId = +request.params.userId;
  const params = request.body;

  const usersJson = require(usersJsonPath);
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

  response.json({
    message: "Updated user with id " + userId
  });
});

export default router;
