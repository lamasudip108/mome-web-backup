import Wallet from '../models/wallet.model';
import uniqid from 'uniqid';
import Constant from '../utils/constants';
import Customer from "../models/customer.model";
import Boom from "@hapi/boom";

/**
 * Get all wallet by customer id
 *
 * @returns {Promise}
 */
export function getAllByCustomerId(id) {
  return Wallet.forge().where({ customer_id: id }).fetchAll();
}

/**
 * Get all wallet
 *
 * @returns {Promise}
 */
export function getAll() {
  return Wallet.forge().fetchAll();
}

/**
 *
 * @param sender
 * @param receiver
 * @param amount
 * @param description
 * @returns {*}
 */
export function sendMoney(sender, receiver, amount,description){

  return new Wallet({
    number: uniqid(),
    sender: sender.get("id"),
    receiver: receiver.get("id"),
    amount: amount,
    fees: 0.00,
    is_request: 0,
    description: description,
    status: Constant.payment.status.success,
    customer_id: sender.get('id')
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
export function requestMoney(requester, sender, amount,description){

  return new Wallet({
    number: uniqid(),
    sender: sender.get("id"),
    receiver: requester.get("id"),
    amount: amount,
    fees: 0.00,
    is_request: 1,
    description: description,
    status: Constant.payment.status.pending,
    customer_id: requester.get('id')
  }).save();

}

/**
 * Get all wallet by customer id
 *
 * @returns {Promise}
 */
export function getRequestWalletByCustomerId(id, type) {

  let param;

  // eslint-disable-next-line eqeqeq
  if (type === 'sent') {
    param = { customer_id: id, is_request: 1 };
    // eslint-disable-next-line eqeqeq
  } else if (type === 'receive') {
    param = { sender: id, is_request: 1 };
  }

  return Wallet.forge().where(param).fetchAll();
}


export function updateWalletTransferStatus(id,status){

  return new Wallet({ id })
    .save({
      status: status,
    })
    .catch(Wallet.NoRowsUpdatedError, () => {
      throw Boom.notFound('Wallet not found.');
    });

}
