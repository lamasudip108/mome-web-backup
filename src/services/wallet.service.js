import Wallet from '../models/wallet.model';
import uniqid from 'uniqid';
import Constant from "../utils/constants";

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
 * @param t
 * @returns {*}
 */
export function sendMoney(sender, receiver, amount,description,t){

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
