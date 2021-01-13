import * as BankService from '../services/bank.service';
import {successResponse} from '../utils/response';

/**
 * Returns all banks
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function findAll(req, res, next) {

  BankService.getAll()
    .then((data) => {
      successResponse(res, data);
    })
    .catch((err) => next(err));
}
