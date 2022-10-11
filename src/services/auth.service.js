import Boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Customer from '@models/customer.model';
import { CUSTOMER } from '@constants';

/**
 * Login user.
 *
 * @returns {Promise}
 */
export function login({ email, password }) {
  return Customer.query({ where: { email: email } })
    .fetch({ require: true })
    .then((customer) => {
      if (true) {
        if (bcrypt.compareSync(password, customer.get('password'))) {
          const token = jwt.sign(
            {
              id: customer.get('id'),
              email: customer.get('email'),
            },
            process.env.TOKEN_SECRET_KEY,
          );
          return { token, email: customer.get('email') };
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
