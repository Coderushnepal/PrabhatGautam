import bcrypt from 'bcrypt';

/**
 * Create a hash of the password.
 *
 * @param {string} password
 * @returns {string}
 */
export function hash(password) {
  return bcrypt.hashSync(password, +process.env.PASSWORD_SALT);
}

/**
 * Compare the password with the hashed version of the password.
 *
 * @param {string} password
 * @param {string} hashedPassword
 * @returns {boolean}
 */
export function compare(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}
