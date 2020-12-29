import * as WalletService from "../services/wallet.service";


/**
 * Returns all wallet record by customer id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function findAllByUserId(req, res, next) {

  WalletService.getAllByUserId(req.params.userid)
    .then((data) => res.json({ data }))
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
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}