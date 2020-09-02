import { Router } from 'express';

import { validateAddTodo } from './schemas/todo';
import * as endpoints from './constants/endpoints';
import * as userController from './controllers/user';
import * as todoController from './controllers/todo';
import { validateUserCreation } from './schemas/user';

const router = Router();

router.get('/', (req, res, next) => {  
  res.json({
    name: 'todo-api',
    version: '1.0.0'
  });
});

router.post(endpoints.CREATE_USER, validateUserCreation, userController.createUser);

router.get(endpoints.GET_ALL_TODOS, todoController.getAllTodos);

router.get(endpoints.GET_TODO_BY_ID, todoController.getTodoById);

router.post(endpoints.ADD_TODO, validateAddTodo, todoController.addTodo);

router.delete(endpoints.REMOVE_TODO, todoController.removeTodo);

export default router;
