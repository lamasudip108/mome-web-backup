import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';

import User from '../models/user.model';

/**
 * Find all the users
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findAll(req, res) {
  User.forge()
    .fetchAll()
    .then(user => res.json({
        success: true,
        data: user.toJSON(),
      }),
    )
    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false, message: err.message,
      }),
    );
}

/**
 *  Find user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findById(req, res) {
  User
    .forge({ id: req.params.id })
    .fetch({ require: true })
    .then(user => {
      res.json({
        success: true,
        data: user.toJSON(),
      });
    }).catch(User.NotFoundError, () => {
    res.status(HttpStatus.NOT_FOUND).json({
      success: false, message: 'User not found.',
    });
  }).catch((err) => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false, message: err.message,
    });
  });
}

/**
 * Store new user
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function store(req, res) {
  const { first_name, last_name, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);

  User.forge({
    first_name, last_name, email, hashPassword,
  }).save()
    .then(user => res.json({
        success: true,
        data: user.toJSON(),
      }),
    )
    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false, message: err.message,
      }),
    );
}

/**
 * Update user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {
  const { first_name, last_name, email } = req.body;
  User.forge({ id: req.params.id })
    .fetch({ require: true })
    .then(user => user.save({
        first_name: first_name || user.get('first_name'),
        last_name: last_name || user.get('last_name'),
        email: email || user.get('email'),
      })
        .then(() => res.json({
            success: true,
            data: user.toJSON(),
          }),
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, message: err.message,
          }),
        ),
    )
    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false, message: err.message,
      }),
    );
}

/**
 * Destroy user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function destroy(req, res) {
  User.forge({ id: req.params.id })
    .fetch({ require: true })
    .then(user => user.destroy()
      .then(() => res.json({
          success: true,
          data: { message: 'User deleted successfully.' },
        }),
      )
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          success: false, message: err.message,
        }),
      ),
    )
    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false, message: err.message,
      }),
    );
}