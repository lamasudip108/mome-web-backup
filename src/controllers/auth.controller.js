import * as authService from '../services/auth.service';

/**
 * Login user by email and password
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {*}
 */
export function login(req, res, next) {
  authService.login(req.body)
    .then((data) => res.json({ success: true, data }))
    .catch((err) => next(err));

}
