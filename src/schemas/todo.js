import Joi from 'joi';

const ADD_TODO_SCHEMA = Joi.object().keys({
  todoText: Joi.string().max(500).required()
});

const UPDATE_TODO_SCHEMA = Joi.object()
  .keys({
    todoText: Joi.string().max(500),
    isCompleted: Joi.boolean()
  })
  .min(1);

export function validateAddTodo(req, res, next) {
  try {
    Joi.assert(req.body, ADD_TODO_SCHEMA);

    next();
  } catch (err) {
    next(err);
  }
}

export function validateUpdateTodo(req, res, next) {
  try {
    Joi.assert(req.body, UPDATE_TODO_SCHEMA);

    next();
  } catch (err) {
    next(err);
  }
}
