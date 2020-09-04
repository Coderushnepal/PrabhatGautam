import { verifyToken } from '../services/authenticate';

export default async function authenticate(req, res, next) {
  const userId = +req.params.userId;
  const token = req.headers['authorization'];

  try {
    await verifyToken(userId, token);

    next();
  } catch (err) {
    next(err);
  }
}
