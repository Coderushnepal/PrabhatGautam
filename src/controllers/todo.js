import * as todoService from '../services/todo';

/**
 * Controller to get all todos.
 *
 * @param req
 * @param res
 * @param next
 */
export function getAllTodos(req, res, next) {
  todoService
    .getAllTodos(+req.user.id)
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
  const { todoId } = req.params;

  todoService
    .getTodoById(+req.user.id, +todoId)
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
    .addTodo(+req.user.id, req.body.todoText)
    .then(data => res.json(data))
    .catch(err => next(err));
}

/**
 * Controller to remove a todo for a user.
 *
 * @param req
 * @param res
 * @param next
 */
export function removeTodo(req, res, next) {
  todoService
    .removeTodo(+req.user.id, +req.params.todoId)
    .then(data => res.json(data))
    .catch(err => next(err));
}

/**
 * Controller to update a todo for a user.
 *
 * @param req
 * @param res
 * @param next
 */
export function updateTodo(req, res, next) {
  todoService
    .updateTodo(+req.user.id, +req.params.todoId, req.body)
    .then(data => res.json(data))
    .catch(err => next(err));
}
