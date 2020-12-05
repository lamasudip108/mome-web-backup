import HttpStatus from 'http-status-codes';

import * as CustomerService from '../services/customer.service';

/**
 * Find all the users
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function findAll(req, res, next) {
  CustomerService.getAllUser()
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 *  Find user by id
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function findById(req, res, next) {
  CustomerService.getUser(req.params.id)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Store new user
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function store(req, res, next) {
  CustomerService.storeUser(req.body)
    .then((data) => res.status(HttpStatus.CREATED).json({ data }))
    .catch((err) => next(err));
}

/**
 * Update user by id
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function update(req, res, next) {
  CustomerService.updateUser(req.params.id, req.body)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Destroy user by id
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function destroy(req, res, next) {
  CustomerService.deleteUser(req.params.id)
    .then((data) => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch((err) => next(err));
}
