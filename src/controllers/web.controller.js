import path from 'path';
import jwt from 'jsonwebtoken';
import HttpStatus from 'http-status-codes';

import * as CustomerService from '@services/customer.service';

/**
 * Verify email link by jwt token
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function verifyAccountByToken(req, res) {
  const { token } = req.params;

  CustomerService.verifyAccount(token)
    .then((data) => {
      if (undefined === data) {
        res.sendFile(path.join(__dirname, '../../public/customer/link_expired.html'));
      } else {
        res.sendFile(path.join(__dirname, '../../public/customer/account_verified.html'));
      }
    })
    .catch((err) => console.log(err));

}

/**
 * Render forgot password based on email link click
 *
 * @param req
 * @param res
 * @param next
 */

export function forgotPassword(req, res, next) {

  const { token } = req.params;

  jwt.verify(token, process.env.TOKEN_SECRET_KEY, ((err, decode) => {
    if (err) {
      res.sendFile(path.join(__dirname, '../../public/customer/account_verified.html'));
    } else {
      res.render('new-password-form', { data: { token: token }, layout: false });
    }
  }));
}


/**
 * Set new password for the user
 *
 * @param req
 * @param res
 * @param next
 */

export function resetPassword(req, res, next) {

  // eslint-disable-next-line camelcase
  const { password, c_password, token } = req.body;

  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
    if (err) {
      errorResponse(res, 'Invalid Token', HttpStatus.FORBIDDEN);
    } else {

      // eslint-disable-next-line camelcase
      if (password !== c_password) {
        res.render('new-password-form', {
          data: { token: token, message: 'Password does not match.', color: 'red' },
          layout: false,
        });
      } else {
        const id = decoded.id;
        CustomerService.updatePassword(id, password)
          .then(user => {
            const param = user.attributes;
            param.subject = 'Password Changed Successfully';
            param.template = 'password-change-success';

            notify(param);

            res.render('password-success', {
              data: { first_name: user.get('first_name') },
              layout: false,
            });
          });
      }
    }
  });
}
