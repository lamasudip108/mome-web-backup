import Boom from '@hapi/boom';
import bcrypt from 'bcrypt';

import Customer from '../models/customer.model';

/**
 * Get all customers.
 *
 * @returns {Promise}
 */
export function getAllCustomer() {
  return Customer.forge().fetchAll();
}

/**
 * Get a customer.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getCustomer(id) {
  return new Customer({ id })
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
export function storeCustomer(customer) {
  // eslint-disable-next-line camelcase
  const { first_name, middle_name, last_name, email, phone } = customer;
  const password = bcrypt.hashSync(customer.password, 10);

  return new Customer({
    first_name,
    middle_name,
    last_name,
    email,
    password,
    phone,
  }).save();
}

/**
 * Update a customer.
 *
 * @param   {Number|String}  id
 * @param   {Object}         customer
 * @returns {Promise}
 */
export function updateCustomer(id, customer) {
  // eslint-disable-next-line camelcase
  const { first_name, last_name, email, status } = customer;

  return new Customer({ id })
    .save({
      first_name: first_name,
      last_name: last_name,
      email: email,
      status: status,
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
export function deleteCustomer(id) {
  return new Customer({ id })
    .fetch()
    .then((user) => user.destroy())
    .catch(Customer.NotFoundError, () => {
      throw Boom.notFound('Customer not found.');
    });
}


/**
 * Get a customer.
 *
 * @param   {String}  email
 * @returns {Promise}
 */
export function getCustomerByEmail(email) {
  return new Customer({ 'email':email })
    .fetch({ require: false })
    .then((user) => user)
    .catch(Customer.NotFoundError, () => {
      throw Boom.notFound('Customer not found.');
    });
}

/**
 * Get a customer.
 *
 * @param   {Number|String}  phone
 * @returns {Promise}
 */
export function getCustomerByPhone(phone) {
  return new Customer({ 'phone':phone })
    .fetch({ require: false })
    .then((user) => user)
    .catch(Customer.NotFoundError, () => {
      throw Boom.notFound('Customer not found.');
    });
}