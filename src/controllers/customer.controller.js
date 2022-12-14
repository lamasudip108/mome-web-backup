import HttpStatus from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Promise from "bluebird";
import moment from "moment";

import { PAYMENT } from "@constants";
import bookshelf from "@config/bookshelf";
import { notify } from "@config/mailer";
import * as CustomerService from "@services/customer.service";
import * as RequestService from "@services/request.service";
import * as TransactionService from "@services/transaction.service";
import * as ContactService from "@services/contact.service";
import { successResponse, errorResponse } from "@utils/response";

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
  CustomerService.getOne({ id: req.params.id })
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
  CustomerService.getOneByCriteria({ email: req.body.email })
    .then(customer => {
      if (customer !== null) {
        errorResponse(res, req.body.email + " is already in use.");
      } else {
        CustomerService.getOneByCriteria({ phone: req.body.phone })
          .then(customer => {
            if (customer !== null) {
              errorResponse(res, req.body.email + " is already in use.");
            } else {
              CustomerService
                .store(req.body)
                .then(data => {
                  const param = data.attributes;
                  param.template = "welcome";
                  param.subject = "Welcome to Mome";
                  param.confirmationUrl = CustomerService.generateVerificationURL(param.token);

                  notify(param);

                  successResponse(res, data, HttpStatus.CREATED);
                })
                .catch((err) => next(err));
            }
          })
          .catch((err) => next(err));
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
 * Check customer duplicate email on application
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

export function isUniqueEmail(req, res, next) {

  CustomerService.getOneByCriteria({ email: req.body.email })
    .then(customer => {
      if (customer !== null) {
        successResponse(res, true);
      } else {
        successResponse(res, false);
      }
    })
    .catch((err) => next(err));
}

/**
 * Update customer password
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

export function updatePassword(req, res, next) {

  // eslint-disable-next-line camelcase
  const { old_password, new_password } = req.body;

  CustomerService.getOne({ id: req.params.id })
    .then(customer => {

      if (bcrypt.compareSync(old_password, customer.get("password"))) {

        // eslint-disable-next-line camelcase
        if (old_password === new_password) {
          errorResponse(res, "Old password and New password is same.", HttpStatus.FORBIDDEN);
        }

        CustomerService.updatePassword(req.params.id, new_password)
          .then(customer => {
            successResponse(res, "Password changed successfully.");
          })
          .catch(err => next(err));

      } else {
        errorResponse(res, "Your old password does not match.", HttpStatus.FORBIDDEN);
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

export function forgotPassword(req, res, next) {

  const { email } = req.body;

  CustomerService.getOneByCriteria({ email: email })
    .then(customer => {
      if (customer === null) {
        errorResponse(res, "Customer not found.", HttpStatus.NOT_FOUND);
      }

      if ("pending" === customer.get("status")) {
        errorResponse(res, "Your account is not verified.", HttpStatus.FORBIDDEN);
      }

      CustomerService.setForgotPasswordToken(email)
        .then(customer => {
          const param = customer.attributes;
          param.subject = "Reset Your Password";
          param.template = "forgot-password";
          param.forgotPasswordUrl = CustomerService.generateForgotPasswordURL(param.token);

          notify(param);

          successResponse(res, "Reset password link sent successfully in your email address.");
        })
        .catch(err => next(err));

    })
    .catch((err) => next(err));
}

// /**
//  * Render forgot password display page
//  *
//  * @param req
//  * @param res
//  * @param next
//  */
//
// export function forgotPassword(req, res, next) {
//
//   const { token } = req.params;
//
//   jwt.verify(token, process.env.TOKEN_SECRET_KEY, ((err, decode) => {
//     if (err) {
//       res.sendFile(path.join(__dirname, "../../public/customer/account_verified.html"));
//     } else {
//       res.render("new-password-form", { data: { token: token }, layout: false });
//     }
//   }));
// }

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
      errorResponse(res, "Invalid Token", HttpStatus.FORBIDDEN);
    } else {

      // eslint-disable-next-line camelcase
      if (password !== c_password) {

        res.render("new-password-form", {
          data: {
            token: token,
            message: "Password does not match.",
            color: "red"
          },
          layout: false
        });
      } else {
        const id = decoded.id;

        CustomerService.updatePassword(id, password)
          .then(user => {

            const param = user.attributes;
            param.subject = "Password Changed Successfully";
            param.template = "password-change-success";

            notify(param);

            res.render("password-success", {
              data: {
                first_name: user.get("first_name")
              },
              layout: false
            });
          })
          .catch(err => next(err));
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
        errorResponse(res, req.body.account_number + " is already in use.");
      } else {

        CustomerService.addBank(req.params.id, req.body)
          .then((data) => {
            successResponse(res, "Bank added successfully.");
          })
          .catch(err => next(err));
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

  const { email, phone, amount, note } = req.body;

  CustomerService.getOne({ id: cusId })
    .then(sender => {
      if (parseFloat(amount) > sender.get("wallet_amount")) {
        errorResponse(res, "You don't have sufficient amount in your wallet.");
      }

      const param = {
        "email": email,
        "phone": phone,
        "status": "active"
      };

      CustomerService.getOne(param)
        .then(receiver => {

          if (sender.get("id") === receiver.get("id")) {
            errorResponse(res, "You can't send money to yourself.");
          }

          bookshelf.transaction(t => {
            return Promise.all([
              (CustomerService.updateSenderAmount(sender, amount), { transacting: t }),
              (CustomerService.updateReceiverAmount(receiver, amount), { transacting: t }),
              (RequestService.sendMoney(sender, receiver, amount, note), { transacting: t })
            ]);
          }).then(response => {
            successResponse(res, "transfer successful");
          }).catch(err => {
            errorResponse(res, "unsuccessful transfer", HttpStatus.BAD_REQUEST);
          });
        })
        .catch(err => next(err));
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

  const { email, phone, amount, note } = req.body;

  CustomerService.getOne({ id: cusId })
    .then(requester => {

      const param = {
        "email": email,
        "phone": phone,
        "status": "active"
      };

      CustomerService.getOne(param)
        .then(sender => {

          RequestService.requestMoney(requester, sender, amount, note)
            .then(response => {
              successResponse(res, "Request sent successfully.");
            })
            .catch(err => {
              errorResponse(res, err);
            });
        })
        .catch(err => next(err));
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

  let criteria = { "sender_customer_id": req.params.id, "type": "request" };

  RequestService.getRequestByCustomerId(criteria)
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

  let criteria = { "receiver_customer_id": req.params.id, "type": "request" };

  RequestService.getRequestByCustomerId(criteria)
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
  const { id, status } = req.body;

  if (status === 0) {
    RequestService.updateWalletTransferStatus(id, PAYMENT.STATUS.CANCELLED)
      .then(response => {
        successResponse(res, response);
      })
      .catch(err => {
        next(err);
      });
  } else {
    CustomerService.getOne({ id: cusId })
      .then(sender => {

        RequestService.getWalletRequestById(id)
          .then(request => {

            if (request.get("amount") > sender.get("wallet_amount")) {
              errorResponse(res, "You don't have sufficient amount in your wallet.");
            }

            CustomerService.getOne({ id: request.get("receiver_customer_id") })
              .then(receiver => {

                if (sender.get("id") === receiver.get("id")) {
                  errorResponse(res, "You can't send money to yourself.");
                }

                let amount = request.get("amount");

                bookshelf.transaction(t => {
                  return Promise.all([
                    (CustomerService.updateSenderAmount(sender, amount), { transacting: t }),
                    (CustomerService.updateReceiverAmount(receiver, amount), { transacting: t }),
                    (RequestService.updateWalletTransferStatus(id, PAYMENT.STATUS.COMPLETED), { transacting: t })
                  ]);
                }).then(response => {
                  successResponse(res, "transfer successful");
                }).catch(err => {
                  errorResponse(res, "unsuccessful transfer", HttpStatus.BAD_REQUEST);
                });
              })
              .catch(err => next(err));
          })
          .catch(err => next(err));
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

        //todo code refactor needed

        d.attributes.created_at = moment(d.attributes.created_at).format("YYYY-MM-DD HH:mm:ss");
        d.attributes.filter_date = date;
        d.attributes.merchant = d.relations.merchant.attributes;

        delete d.relations.merchant.attributes.password;
        delete d.relations.merchant.attributes.language;
        delete d.relations.merchant.attributes.total_sales;
        delete d.relations.merchant.attributes.is_verified;
        delete d.relations.merchant.attributes.token;
        delete d.relations.merchant.attributes.otp_code;
        delete d.relations.merchant.attributes.created_at;
        delete d.relations.merchant.attributes.updated_at;

        delete d.attributes.merchant_id;
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

/**
 * Fetch particular transaction of customer by id
 *
 * @param req
 * @param res
 * @param next
 */
export function findCustomerTransactionById(req, res, next) {

  const { id, tid } = req.params;

  let criteria = { customer_id: id, id: tid };

  TransactionService.findCustomerTransactionById(criteria)
    .then(data => {
      successResponse(res, data);
    })
    .catch(err => {
      next(err);
    });
}


/**
 * Fetch all contacts of the customer
 *
 * @param req
 * @param res
 * @param next
 */
export function findMyContacts(req, res, next) {

  let criteria = { customer_id: req.params.id };

  ContactService.findMyContacts(criteria)
    .then(data => {
      res.json({ data });
    })
    .catch(err => {
      next(err);
    });
}

/**
 * Fetch all active customer excluding self
 *
 * @param req
 * @param res
 * @param next
 */
export function findAllCustomer(req, res, next) {

  CustomerService.findAllCustomer(req.params.id)
    .then(data => {
      res.json({ data });
    })
    .catch(err => {
      next(err);
    });
}
