import HttpStatus from 'http-status-codes';
import * as CustomerService from '../services/customer.service';
import {notify} from '../config/mailer';
import {successResponse, errorResponse} from '../utils/response';
import bcrypt from 'bcrypt';
import BankName from '../models/bank_name.model';
import jwt from 'jsonwebtoken';
import path from 'path';

/**
 * Find all the customers
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function findAll(req, res, next) {
  CustomerService.getAll()
    .then((data) => {
      successResponse(res, data);
    })
    .catch((err) => next(err));
}

/**
 *  Find customer by id
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function findById(req, res, next) {
  CustomerService.getOne(req.params.id)
    .then((data) => {
        successResponse(res, data);
      }
    )
    .catch((err) => next(err));
}

/**
 * Store new customer
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function store(req, res, next) {

  CustomerService.getCustomerByEmail(req.body.email)
    .then(user => {
      if (user !== null) {
        errorResponse(res,req.body.email + ' is already in use.');

      } else {
        CustomerService.getCustomerByPhone(req.body.phone)
          .then(user => {
            if (user !== null) {
              errorResponse(res,req.body.phone + ' is already in use.');

            } else {
              CustomerService
                .storeCustomer(req.body)
                .then(data => {

                  const param = data.attributes;
                  param.template = 'welcome';
                  param.subject = 'Welcome to Mome';
                  param.confirmationUrl = CustomerService.generateConfirmationUrl(param.token);

                  notify(param);

                  successResponse(res, data, HttpStatus.CREATED);
                });
            }
          });
      }
    })
    .catch((err) => next(err));
}

/**
 * Update customer by id
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function update(req, res, next) {
  CustomerService.update(req.params.id, req.body)
    .then((data) => {
      successResponse(res, data);
    })
    .catch((err) => next(err));
}

/**
 * Destroy customer by id
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function destroy(req, res, next) {
  CustomerService.destroy(req.params.id)
    .then((data) => {
      successResponse(res, data, HttpStatus.NO_CONTENT);
    })
    .catch((err) => next(err));
}

/**
 * Check customer email existence
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

export function isUniqueEmail(req, res, next){

  CustomerService.getCustomerByEmail(req.body.email)
    .then(user => {
      if (user !== null) {
        successResponse(res, true);
      } else {
        successResponse(res, false);
      }
    })
    .catch((err) => next(err));
}

/**
 * Update the password for logged in user
 *
 * @param req
 * @param res
 * @param next
 */

export function updatePassword(req, res, next) {

  // eslint-disable-next-line camelcase
  const { old_password, new_password } = req.body;

  CustomerService.getCustomer(req.params.id)
    .then(user => {

      if (bcrypt.compareSync(old_password, user.get('password'))) {

        // eslint-disable-next-line camelcase
        if (old_password === new_password) {
          errorResponse(res, 'Old password and New password is same.',HttpStatus.FORBIDDEN);
        }

        CustomerService.updatePassword(req.params.id, new_password)
          .then(user => {
            successResponse(res, 'Password changed successfully.');
          });

      } else {
        errorResponse(res, 'Your old password does not match.',HttpStatus.FORBIDDEN);
      }

    })
    .catch(err => {
      next(err);
    });
}

/**
 * Send forgot password url to customers
 *
 * @param req
 * @param res
 * @param next
 */

export function forgotPasswordRequest(req, res, next) {

  const { email } = req.body;

  CustomerService.getCustomerByEmail(email)
    .then(user => {

      if (user === null) {
        errorResponse(res, 'Customer not found.',HttpStatus.NOT_FOUND);
      }

      let isVerified = user.get('is_verified');

      if (0 === isVerified) {
        errorResponse(res, 'Your account is not verified.', HttpStatus.FORBIDDEN);
      }

      CustomerService.setForgotPasswordToken(email)
        .then(user => {

          const param = user.attributes;
          param.subject = 'Reset Your Password';
          param.template = 'forgot-password';
          param.forgotPasswordUrl = CustomerService.generateForgotPasswordUrl(param.token);

          notify(param);

          successResponse(res, 'Reset password link send successfully in your email.');
        });

    })
    .catch(err => {
      next(err);
    });
}

/**
 * Render forgot password display page
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
            res.render('new-password-form', { data:{token: token}, layout: false });
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
     errorResponse(res,'Invalid Token',HttpStatus.FORBIDDEN);
    } else {

      // eslint-disable-next-line camelcase
      if (password !== c_password) {

        res.render('new-password-form', {
          data: {
            token: token,
            message: 'Password does not match.',
            color: 'red'
          },
          layout: false
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
              data: {
                first_name: user.get('first_name'),
              },
              layout: false
            });
          });
      }}
  });
}

/**
 * Add a new bank for customer
 *
 * @param req
 * @param res
 * @param next
 */

export function addBank(req, res, next) {

  CustomerService.getCustomerByAccNumber(req.params.id, req.body.account_number)
    .then(account => {

      if (account !== null) {
        errorResponse(res, req.body.account_number + ' is already in use.');
      }else {

        CustomerService.addBank(req.params.id, req.body)
          .then((data) => {
            BankName.getBankNameById(data.attributes.bank_id)
              .then(customer => {
                data.attributes.bank = customer;
                successResponse(res, data);
              });
          });
      }
    })
    .catch((err) => next(err));

}

/**
 * Find all bank for customers
 *
 * @param req
 * @param res
 * @param next
 */

export function findAllBankById(req, res, next) {
  CustomerService.findAllBankById(req.params.id)
    .then((data) => {
      successResponse(res, data);
    })
    .catch((err) => next(err));
}

