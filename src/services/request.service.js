import Boom from "@hapi/boom";
import uniqid from "uniqid";

import { PAYMENT } from "@constants";
import Request from "@models/request.model";

/**
 * Get all wallet by customer id
 *
 * @returns {Promise}
 */
export function getAllByCustomerId(id) {
  return Request.forge().where({ customer_id: id }).fetchAll();
}

/**
 * Get all wallet
 *
 * @returns {Promise}
 */
export function getAll() {
  return Request.forge().fetchAll();
}

/**
 *
 * @param sender
 * @param receiver
 * @param amount
 * @param description
 * @returns {*}
 */
export function sendMoney(sender, receiver, amount, note) {

  return new Request({
    sender_customer_id: sender.get("id"),
    receiver_customer_id: receiver.get("id"),
    amount: amount,
    type: "send",
    notes: note,
    status: PAYMENT.STATUS.COMPLETED
  }).save();

}

/**
 *
 * @param requester
 * @param sender
 * @param amount
 * @param description
 * @returns {*}
 */
export function requestMoney(requester, sender, amount, note) {

  return new Request({
    sender_customer_id: sender.get("id"),
    receiver_customer_id: requester.get("id"),
    amount: amount,
    type: "request",
    notes: note,
    status: PAYMENT.STATUS.PENDING
  }).save();

}

/**
 * Get all wallet by customer id
 *
 * @returns {Promise}
 */
export function getRequestByCustomerId(criteria) {

  return Request.forge().where(criteria).fetchAll();
}

/**
 *
 * Update wallet Transfer Status
 *
 * @param id
 * @param status
 * @returns {*}
 */

export function updateWalletTransferStatus(id, status) {

  return new Request({ id })
    .save({
      status: status
    })
    .catch(Request.NoRowsUpdatedError, () => {
      throw Boom.notFound("Request not found.");
    });

}

/**
 * Get wallet request details by Id
 *
 * @param id
 * @returns {*}
 */

export function getWalletRequestById(id) {
  return Request.forge().where({ id: id }).fetch();
}
