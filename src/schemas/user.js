import Joi from 'joi';

const CREATE_USER_SCHEMA = Joi.object().keys({
  firstName: Joi.string().max(20).required(),
  lastName: Joi.string().max(20).required(),
  email: Joi.string().max(100).required(),
  password: Joi.string().min(8).max(30).required()
});

export function validateUserCreation(req, res, next) {
  try {
    Joi.assert(req.body, CREATE_USER_SCHEMA);

    next();
  } catch (err) {
    next(err);
  }
}
