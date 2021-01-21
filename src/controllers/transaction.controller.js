import * as TransactionService from '../services/transaction.service';
import { successResponse } from '../utils/response';

/**
 * Returns all transaction record by customer id
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {*}
 */

export function findAllByCustomerId(req, res, next) {

  TransactionService.findAllTransactionByCustomer(req.params.id)
    .then((data) => {
      successResponse(res, data);
    })
    .catch((err) => next(err));
}

/**
 * Returns all transaction
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {*}
 */

export function findAll(req, res, next) {

  TransactionService.getAll()
    .then((data) => {
      successResponse(res, data);
    })
    .catch((err) => next(err));
}
