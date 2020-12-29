import * as TransactionService from '../services/transaction.service';
import {successResponse} from '../utils/response';

/**
 * Returns all transaction record by customer id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function findAllByUserId(req, res, next) {

  TransactionService.getAllByUserId(req.params.userid)
    .then((data) => {
      successResponse(res, data);
    })
    .catch((err) => next(err));
}

/**
 * Returns all transaction
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function findAll(req, res, next) {

  TransactionService.getAll()
    .then((data) => {
      successResponse(res, data);
    })
    .catch((err) => next(err));
}