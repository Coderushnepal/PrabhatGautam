import { Router } from 'express';

import * as endpoints from './constants/endpoints';
import * as userController from './controllers/user';
import { validateUserCreation, validateUserUpdate } from './schemas/user';

const router = Router();

router.get('/', (req, res, next) => {  
  res.json({
    name: 'todo-api',
    version: '1.0.0'
  });
});

router.get(endpoints.GET_USERS, userController.getAllUsers);

router.get(endpoints.GET_USER_BY_ID, userController.getUserById);

router.post(endpoints.CREATE_USER, validateUserCreation, userController.createUser);

router.delete(endpoints.DELETE_USER, userController.deleteUser);

router.put(endpoints.UPDATE_USER, validateUserUpdate, userController.updateUser);

export default router;
