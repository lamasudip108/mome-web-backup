import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

import Customer from '@models/customer.model';

/**
 * Validate application jwt was provided in the request
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 *
 */

export default (req, res, next) => {
  const publicEndpoints = [
    '/api/auths/login',
    '/api/customers/forgot-password-notification',
    '/api/web/auths/verification',
    '/api/web/auths/forgot-password',
    '/api/web/auths/reset-password',
  ]; //List of endpoints that doesn't require auth

  if (publicEndpoints.some(path => path === req.path)) {
    return next();
  }

  const authorizationHeader = req.headers['authorization'];
  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(HttpStatus.UNAUTHORIZED).json({ error: 'You are not authorized to perform this operation!' });
      } else {
        Customer.query({
          where: { id: decoded.id },
          select: ['email', 'id'],
        }).fetch().then(user => {
          if (!user) {
            res.status(HttpStatus.NOT_FOUND).json({ error: 'Customer not found.' });
          } else {
            req.currentUser = user;
            next();
          }

        });
      }
    });
  } else {
    res.status(HttpStatus.FORBIDDEN).json({
      error: 'No token provided',
    });
  }
};
