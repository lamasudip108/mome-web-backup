import * as WalletService from '../services/wallet.service';
import { successResponse } from '../utils/response';

/**
 * Returns all wallet record by customer id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function findAllByCustomerId(req, res, next) {

  WalletService.getAllByCustomerId(req.params.id)
    .then((data) => {
      successResponse(res, data);
    })
    .catch((err) => next(err));
}

/**
 * Returns all wallet
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function findAll(req, res, next) {

  WalletService.getAll()
    .then((data) => {
      successResponse(res, data);
    })
    .catch((err) => next(err));
}
