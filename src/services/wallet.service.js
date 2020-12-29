import Wallet from '../models/wallet.model';

/**
 * Get all wallet by customer id
 *
 * @returns {Promise}
 */
export function getAllByUserId(id) {
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