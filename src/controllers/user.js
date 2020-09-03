import * as userService from '../services/user';

/**
 * Controller to create a new user.
 *
 * @param req
 * @param res
 * @param next
 */
export function createUser(req, res, next) {
  userService
    .createUser(req.body)
    .then(data => res.json(data))
    .catch(err => next(err));
}

/**
 * Controller for user login.
 *
 * @param req
 * @param res
 * @param next
 */
export function login(req, res, next) {
  userService
    .login(req.body)
    .then(data => res.json(data))
    .catch(err => next(err));
}
