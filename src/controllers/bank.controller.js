import * as BankService from '../services/bank.service';
import {successResponse} from '../utils/response';

/**
 * Returns all banks
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {*}
 */

export function findAll(req, res, next) {

  BankService.getAll()
    .then((data) => {
      successResponse(res, data);
    })
    .catch((err) => next(err));
}
