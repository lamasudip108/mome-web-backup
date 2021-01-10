import Boom from "@hapi/boom";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Constant from "../utils/constants";
import Customer from "../models/customer.model";


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
      throw Boom.notFound("Customer not found.");
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
  // eslint-disable-next-line camelcase
  const token = confirmationToken(email);

  return new Customer({
    first_name,
    middle_name,
    last_name,
    email,
    password,
    phone,
    token
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
      po_box: po_box
    })
    .catch(Customer.NoRowsUpdatedError, () => {
      throw Boom.notFound("Customer not found.");
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
      throw Boom.notFound("Customer not found.");
    });
}


/**
 * Get a customer.
 *
 * @param   {String}  email
 * @returns {Promise}
 */
export function getCustomerByEmail(email) {
  return new Customer({ "email": email })
    .fetch({ require: false })
    .then((user) => user)
    .catch(Customer.NotFoundError, () => {
      throw Boom.notFound("Customer not found.");
    });
}

/**
 * Get a customer.
 *
 * @param   {Number|String}  phone
 * @returns {Promise}
 */
export function getCustomerByPhone(phone) {
  return new Customer({ "phone": phone })
    .fetch({ require: false })
    .then((user) => user)
    .catch(Customer.NotFoundError, () => {
      throw Boom.notFound("Customer not found.");
    });
}

/**
 * Generate Confirmation Url
 *
 * @param   {String}  token
 * @returns {string}
 */
export function generateConfirmationUrl(token) {
  return `${Constant.app.host}/api/auths/confirmation?token=${token}`;
}

function confirmationToken(email) {
  return jwt.sign({
      email: email
    },
    process.env.TOKEN_SECRET_KEY
  );
}

/**
 * Verify User Account
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
            "is_verified": 1,
            "status": Constant.users.status.active,
            "token": null
          });
      } else {
        user = null;
      }
    })
    .catch(Customer.NotFoundError, () => {
      throw Boom.notFound("Customer not found.");
    });
  /*

  // check with this code why not working, directly update by token

   return new Customer
      .where({ remember_token: token })
      .save({ email: "bissssss@example.com" }, { patch: true })
      .then((user) => {
        console.log(user, "asdf");
      })
      .catch(Customer.NotFoundError, () => {
        throw Boom.notFound("Customer not found.");
      });
  */

}

/**
 * Update password for logged in user
 *
 * @param id
 * @param password
 * @returns {*}
 */

export function updatePassword(id, password) {

  const newPassword = bcrypt.hashSync(password, 10);

  return new Customer({ id })
    .save({
      password: newPassword
    })
    .catch(Customer.NoRowsUpdatedError, () => {
      throw Boom.notFound("Customer not found.");
    });

}
