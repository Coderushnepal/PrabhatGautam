import * as todoService from '../services/todo';

/**
 * Controller to get all todos
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export function getAllTodos(req, res, next) {
  todoService
    .getAllTodos(+req.params.userId)
    .then(data => res.json(data))
    .catch(err => next(err));
}

/**
 * Controller to get specific todo for a user.
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export function getTodoById(req, res, next) {
  const { userId, todoId } = req.params;

  todoService
    .getTodoById(+userId, +todoId)
    .then(data => res.json(data))
    .catch(err => next(err));
}

/**
 * Controller to add a todo for a user.
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export function addTodo(req, res, next) {
  todoService
    .addTodo(+req.params.userId, req.body.todoText)
    .then(data => res.json(data))
    .catch(err => next(err));
}
