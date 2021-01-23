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

  if (publicEndpoints.some(path => path === req.path || req.path.includes(path))) {
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
        res.status(HttpStatus.UNAUTHORIZED).json({
          success: false,
          message: 'You are not authorized to perform this operation!',
        });
      } else {
        Customer.query({
          where: { id: decoded.id },
          select: ['email', 'id'],
        }).fetch().then(user => {
          if (!user) {
            res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'User not found.' });
          } else {
            req.currentUser = user;
            next();
          }

        });
      }
    });
  } else {
    res.status(HttpStatus.FORBIDDEN).json({
      success: false, message: 'No token provided',
    });
  }
};
