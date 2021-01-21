import HttpStatus from 'http-status-codes';
import * as WalletService from '@services/wallet.service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';
import Constant from '@utils/constants';
import bookshelf from '@config/bookshelf';
import Promise from 'bluebird';
import * as CustomerService from '@services/customer.service';
import {notify} from '@config/mailer';
import {successResponse, errorResponse} from '@utils/response';
import Bank from '@models/bank.model';
import * as TransactionService from '@services/transaction.service';
import moment from 'moment';

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
  CustomerService.getOne({id:req.params.id})
    .then((data) => {
        successResponse(res, data);
      })
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

  CustomerService.getOne({email: req.body.email})
    .then(user => {
      if (user !== null) {
        errorResponse(res, req.body.email + ' is already in use.');

      } else {
        CustomerService.getOne({phone: req.body.phone})
          .then(user => {
            if (user !== null) {
              errorResponse(res, req.body.phone + ' is already in use.');

            } else {
              CustomerService
                .store(req.body)
                .then(data => {
                  const param = data.attributes;
                  param.template = 'welcome';
                  param.subject = 'Welcome to Mome';
                  param.confirmationUrl = CustomerService.generateVerificationURL(param.token);

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

export function isUniqueEmail(req, res, next) {

  CustomerService.getOne({email: req.body.email})
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
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

export function updatePassword(req, res, next) {

  // eslint-disable-next-line camelcase
  const { old_password, new_password } = req.body;

  CustomerService.getOne({id:req.params.id})
    .then(user => {

      if (bcrypt.compareSync(old_password, user.get('password'))) {

        // eslint-disable-next-line camelcase
        if (old_password === new_password) {
          errorResponse(res, 'Old password and New password is same.', HttpStatus.FORBIDDEN);
        }

        CustomerService.updatePassword(req.params.id, new_password)
          .then(user => {
            successResponse(res, 'Password changed successfully.');
          });

      } else {
        errorResponse(res, 'Your old password does not match.', HttpStatus.FORBIDDEN);
      }

    })
    .catch((err) => next(err));
}

/**
 * Send forgot password notification to customer email
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

export function forgotPasswordNotification(req, res, next) {

  const { email } = req.body;

  CustomerService.getOne({email:email})
    .then(user => {
      if (user === null) {
        errorResponse(res, 'Customer not found.', HttpStatus.NOT_FOUND);
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
          param.forgotPasswordUrl = CustomerService.generateForgotPasswordURL(param.token);

          notify(param);

          successResponse(res, 'Reset password link sent successfully in your email address.');
        });

    })
    .catch((err) => next(err));
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
                first_name: user.get('first_name')
              },
              layout: false
            });
          });
      }
    }
  });
}


/**
 * Add a new bank for customer
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

export function addBank(req, res, next) {

  CustomerService.getCustomerByAccNumber(req.params.id, req.body.account_number)
    .then(account => {

      if (account !== null) {
        errorResponse(res, req.body.account_number + ' is already in use.');
      } else {

        CustomerService.addBank(req.params.id, req.body)
          .then((data) => {
            Bank.getNameById(data.attributes.bank_id)
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
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

export function findAllBankById(req, res, next) {
  CustomerService.findAllBankById(req.params.id)
    .then((data) => {
      successResponse(res, data);
    })
    .catch((err) => next(err));
}

/**
 * Send money from ewallet to ewallet
 *
 *
 * @param req
 * @param res
 * @param next
 */
export function sendMoney(req, res, next) {

  const cusId = req.params.id;

  const { email, phone, amount, description } = req.body;

  CustomerService.getCustomer(cusId)
    .then(sender => {

      if (parseFloat(amount) > sender.get('wallet_amount')) {
        errorResponse(res, 'You don\'t have sufficient amount in your wallet.');
      }

      const param = {
        'email': email,
        'phone': phone,
        'is_verified': 1
      };

      CustomerService.geCustomerByParams(param)
        .then(receiver => {

          if (sender.get('id') === receiver.get('id')) {
            errorResponse(res, 'You can\'t send money to yourself ');
          }

          bookshelf.transaction(t => {
            return Promise.all([
              (CustomerService.updateSenderAmount(sender, amount), { transacting: t }),
              (CustomerService.updateReceiverAmount(receiver, amount), { transacting: t }),
              (WalletService.sendMoney(sender, receiver, amount, description), { transacting: t })
            ]);
          }).then(response => {
            successResponse(res, 'transfer successful');
          }).catch(err => {
            errorResponse(res, 'unsuccessful transfer', HttpStatus.BAD_REQUEST);
          });
        });
    })
    .catch(err => next(err));
}

/**
 * Request money from another ewallet user
 *
 * @param req
 * @param res
 * @param next
 */
export function requestMoney(req, res, next) {
  const cusId = req.params.id;

  const { email, phone, amount, description } = req.body;

  CustomerService.getCustomer(cusId)
    .then(requester => {
      const param = {
        'email': email,
        'phone': phone,
        'is_verified': 1
      };

      CustomerService.geCustomerByParams(param)
        .then(sender => {

          WalletService.requestMoney(requester, sender, amount, description)
            .then(response => {
              successResponse(res, 'Request sent successfully.');
            })
            .catch(err => {
              errorResponse(res, err);
            });
        });
    })
    .catch(err => next(err));
}

/**
 * Fetch all sent wallet request
 *
 * @param req
 * @param res
 * @param next
 */

export function sentWalletRequest(req, res, next) {

  let cusId = req.params.id;

  WalletService.getRequestWalletByCustomerId(cusId, 'sent')
    .then(data => {
      successResponse(res, data);
    })
    .catch(err => {
      next(err);
    });
}

/**
 * Fetch all received wallet request
 *
 * @param req
 * @param res
 * @param next
 */

export function receivedWalletRequest(req, res, next) {

  let cusId = req.params.id;

  WalletService.getRequestWalletByCustomerId(cusId, 'receive')
    .then(data => {
      successResponse(res, data);
    })
    .catch(err => {
      next(err);
    });
}

/**
 * Respond to wallet request
 *
 * @param req
 * @param res
 * @param next
 */
export function respondWalletRequest(req, res, next) {

  let cusId = req.params.id;
  const { request_id, status } = req.body;

  if (status === 0) {
    WalletService.updateWalletTransferStatus(request_id, Constant.payment.status.cancelled)
      .then(response => {
        successResponse(res, response);
      })
      .catch(err => {
        next(err);
      });
  } else {
    CustomerService.getCustomer(cusId)
      .then(sender => {

        WalletService.getWalletRequestById(request_id)
          .then(wallet => {

            if (wallet.get('amount') > sender.get('wallet_amount')) {
              errorResponse(res, 'You don\'t have sufficient amount in your wallet.');
            }

            CustomerService.getCustomer(wallet.get('receiver'))
              .then(receiver => {

                if (sender.get('id') === receiver.get('id')) {
                  errorResponse(res, 'You can\'t send money to yourself ');
                }

                let amount = wallet.get('amount');

                bookshelf.transaction(t => {
                  return Promise.all([
                    (CustomerService.updateSenderAmount(sender, amount), { transacting: t }),
                    (CustomerService.updateReceiverAmount(receiver, amount), { transacting: t }),
                    (WalletService.updateWalletTransferStatus(request_id, Constant.payment.status.success), { transacting: t })
                  ]);
                }).then(response => {
                  successResponse(res, 'transfer successful');
                }).catch(err => {
                  errorResponse(res, 'unsuccessful transfer', HttpStatus.BAD_REQUEST);
                });
              });
          });
      })
      .catch(err => next(err));
  }
}

/**
 *
 * @param req
 * @param res
 * @param next
 */

//code refactor needed

export function findAllTransactionByCustomer(req, res, next) {

  TransactionService.findAllTransactionByCustomer(req.params.id)
    .then((data) => {

      let arr = [];

      data.map(d => {

        let date = moment(d.attributes.created_at).format("YYYY-MM-DD");

/*        if(date === moment().format("YYYY-MM-DD")){
          date = 'today';
        }else if(date === moment().subtract(1,'days').format("YYYY-MM-DD")){
          date = 'yesterday';
        }*/

        d.attributes.filter_date = date;
        delete d.attributes.updated_at;
        arr.push(d.attributes);
      });

      const key = "filter_date";

      const transactions = [...arr.reduce((acc, o) =>
         acc.set(o[key], (acc.get(o[key]) || []).concat(o))
        , new Map).values()];

      successResponse(res, transactions);

    })
    .catch((err) => next(err));

}
