import { sign, decode } from 'jsonwebtoken';

export function generateToken(user) {
  return sign(user, process.env.TOKEN_SECRET);
}

export function decodeToken(token) {
  return decode(token);
}
