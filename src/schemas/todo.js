import Joi from 'joi';

const ADD_TODO_SCHEMA = Joi.object().keys({
  todoText: Joi.string().max(500).required()
});

export function validateAddTodo(req, res, next) {
  try {
    Joi.assert(req.body, ADD_TODO_SCHEMA);

    next();
  } catch (err) {
    next(err);
  }
}
