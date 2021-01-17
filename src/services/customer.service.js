import Boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { APP, CUSTOMER } from '@constants';
import Customer from '@models/customer.model';
import Bank from '@models/bank.model';

/**
 * Get all customers.
 *
 * @returns {Promise}
 */
export function getAll() {
  return Customer.forge().fetchAll();
}

/**
 * Get a customer based on the selection criteria.
 *
 * @param   {Object}  criteria
 * @returns {Promise}
 */
export function getOne(criteria) {
  return new Customer(criteria)
    .fetch({ require: true })
    .then((user) => user)
    .catch(Customer.NotFoundError, () => {
      throw Boom.notFound('Customer not found.');
    });
}

/**
 * Create new customer.
 *
 * @param   {Object}  customer
 * @returns {Promise}
 */
export function store(customer) {
  // eslint-disable-next-line camelcase
  const { first_name, middle_name, last_name, email, phone } = customer;
  const password = bcrypt.hashSync(customer.password, 10);
  // eslint-disable-next-line camelcase
  const token = jwt.sign({ email: email },
    process.env.TOKEN_SECRET_KEY,
  );

  return new Customer({
    first_name,
    middle_name,
    last_name,
    email,
    password,
    phone,
    token,
  }).save().catch(function(err) {
    if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) { // MySQL
      throw Boom.badRequest('Customer already exists in our system.');
    } else if (err.code === '23505') { // PostgreSQL
      throw Boom.badRequest('Customer already exists in our system.');
    }
  });
}

/**
 * Update a customer.
 *
 * @param   {Number|String}  id
 * @param   {Object}         customer
 * @returns {Promise}
 */
export function update(id, customer) {
  // eslint-disable-next-line camelcase
  const { first_name, last_name, email, phone, street, city, state_province, po_box } = customer;

  return new Customer({ id })
    .save({
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
      street: street,
      city: city,
      state_province: state_province,
      po_box: po_box,
    })
    .catch(Customer.NoRowsUpdatedError, () => {
      throw Boom.notFound('Customer not found.');
    });
}

/**
 * Delete a customer.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function destroy(id) {
  return new Customer({ id })
    .fetch()
    .then((user) => user.destroy())
    .catch(Customer.NotFoundError, () => {
      throw Boom.notFound('Customer not found.');
    });
}


/**
 * Generate verification email URL
 *
 * @param   {String}  token
 * @returns {String}
 */
export function generateVerificationURL(token) {
  return `${APP.HOST}/api/web/auths/verification/${token}`;
}

/**
 * Verify customer account using token
 *
 * @param token
 * @returns {*}
 */
export function verifyAccount(token) {
  return new Customer({ token: token })
    .fetch({ require: false })
    .then((user) => {
      if (user !== null) {
        const id = user.attributes.id;
        return new Customer({ id })
          .save({
            'is_verified': 1,
            'status': CUSTOMER.STATUS.ACTIVE,
            'token': null,
          });
      } else {
        user = null;
      }
    })
    .catch(Customer.NotFoundError, () => {
      throw Boom.notFound('Customer not found.');
    });

}

/**
 * Update password with new one
 *
 * @param id
 * @param password
 * @returns {*}
 */

export function updatePassword(id, password) {
  const newPassword = bcrypt.hashSync(password, 10);

  return new Customer({ id })
    .save({
      password: newPassword,
      token: null,
    })
    .catch(Customer.NoRowsUpdatedError, () => {
      throw Boom.notFound('Customer not found.');
    });

}

/**
 * Set forgot password token for customers
 *
 * @param email
 * @returns {*}
 */

export function setForgotPasswordToken(email) {

  return new Customer({ email: email })
    .fetch({ require: false })
    .then((user) => {
      if (user !== null) {

        const id = user.get('id');
        const token = jwt.sign({
            id: user.get('id'),
            email: user.get('email'),
          },
          process.env.TOKEN_SECRET_KEY,
        );
        return new Customer({ id }).save({ 'token': token});
      } else {
        return user = null;
      }
    })
    .catch(Customer.NotFoundError, () => {
      throw Boom.notFound('Customer not found.');
    });
}

/**
 * Generate forgot password email URL
 *
 * @param   {String}  token
 * @returns {String}
 */
export function generateForgotPasswordURL(token) {
  return `${APP.HOST}/api/web/auths/forgot-password/${token}`;
}

export function addBank(customer_id, bank) {
  // eslint-disable-next-line camelcase
  const { branch, account_holder, account_number, bank_id } = bank;

  return new Bank({
    branch,
    account_holder,
    account_number,
    customer_id,
    bank_id,
  }).save();
}

/**
 * Fetch all bank of customers
 *
 * @param id
 * @returns {Promise<Collection>|Promise|*}
 */

export function findAllBankById(id) {
  return Bank.forge().where({ customer_id: id }).fetchAll({ withRelated: ['bank'] });
}


// eslint-disable-next-line camelcase
export function getCustomerByAccNumber(customer_id, account_number) {
  return new Bank({ 'customer_id': customer_id, 'account_number': account_number })
    .fetch({ require: false })
    .then((data) => data)
    .catch(Customer.NotFoundError, () => {
      throw Boom.notFound('Customer not found.');
    });
}
