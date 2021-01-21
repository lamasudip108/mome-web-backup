import HttpStatus from 'http-status-codes';

import * as userService from '@services/user.service';

/**
 * Find all the users
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function findAll(req, res, next) {
  userService
    .getAll()
    .then((data) => res.json({ success: true, data }))
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
  userService
    .getOne(req.params.id)
    .then((data) => res.json({ success: true, data }))
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
  userService
    .store(req.body)
    .then((data) => res.status(HttpStatus.CREATED).json({ success: true, data }))
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
  userService
    .update(req.params.id, req.body)
    .then((data) => res.json({ success: true, data }))
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
  userService
    .destroy(req.params.id)
    .then((data) => res.status(HttpStatus.NO_CONTENT).json({ success: true, data }))
    .catch((err) => next(err));
}
