import * as TransactionService from "../services/transaction.service";


/**
 * Returns all transaction record by customer id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function findAllByUserId(req, res, next) {

  TransactionService.getAllByUserId(req.params.userid)
    .then((data) => res.json({ data }))
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
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}