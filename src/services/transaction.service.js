import Transaction from '../models/transaction.model';

/**
 * Get all transaction by customer id
 *
 * @returns {Promise}
 */
export function getAllByCustomerId(id) {
  return Transaction.forge().where({ customer_id: id }).fetchAll();
}

/**
 * Get all transaction
 *
 * @returns {Promise}
 */
export function getAll() {
  return Transaction.forge().fetchAll();
}
