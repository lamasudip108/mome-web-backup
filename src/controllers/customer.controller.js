import HttpStatus from 'http-status-codes';
import * as CustomerService from '../services/customer.service';
import {notify} from '../config/mailer';
import {successResponse, errorResponse} from '../utils/response';
import Address from '../models/address.model';

/**
 * Find all the customers
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function findAll(req, res, next) {
  CustomerService.getAllCustomer()
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
  CustomerService.getCustomer(req.params.id)
    .then((data) => {
        Address.getAddressById(data.attributes.id)
          .then(customer => {
            data.attributes.address = customer;
            successResponse(res, data);
          });
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
        errorResponse(res,req.body.email + ' already in use.');

      } else {
        CustomerService.getCustomerByPhone(req.body.phone)
          .then(user => {
            if (user !== null) {
              errorResponse(res,req.body.phone + ' already in use.');

            } else {
              CustomerService
                .storeCustomer(req.body)
                .then(data => {

                  const param = data.attributes;
                  param.template = 'welcome';
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
  CustomerService.updateCustomer(req.params.id, req.body)
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
  CustomerService.deleteCustomer(req.params.id)
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
