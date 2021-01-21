import Boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Customer from '@models/customer.model';
import {CUSTOMER} from '@constants';

/**
 * Login user.
 *
 * @returns {Promise}
 */
export function login({ email, password }) {
  return Customer.query({ where: { email: email } })
    .fetch({ require: true })
    .then((user) => {
      if (user.get('is_verified') === 1 && user.get('status') === CUSTOMER.STATUS.ACTIVE) {
        if (bcrypt.compareSync(password, user.get('password'))) {
          const token = jwt.sign(
            {
              id: user.get('id'),
              email: user.get('email'),
            },
            process.env.TOKEN_SECRET_KEY,
          );
          return { token, email: user.get('email') };
        } else {
          throw Boom.unauthorized('Invalid username or password.');
        }
      } else {
        throw Boom.unauthorized('Please verify your account email address to continue.');
      }
    }).catch(Customer.NotFoundError, () => {
      throw Boom.notFound('User not found.');
    });
}
