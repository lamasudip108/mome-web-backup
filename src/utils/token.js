import jwt from 'jsonwebtoken';
import moment from 'moment';

/**
 * Generate token
 * @param {String} userId
 * @param {Moment} expires
 * @param {string} [secret]
 * @returns {string}
 */
export const generateToken = (userId, expires, secret = process.env.TOKEN_SECRET_KEY) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: moment().add(30, 'minutes').unix(),
  };
  return jwt.sign(payload, secret);
};


/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @returns {Promise<Token>}
 */
export const verifyToken = async (token) => {
  const payload = jwt.verify(token, config.jwt.secret);
  if (!payload) {
    throw new Error('Token not found.');
  }
  return payload.sub;
};
