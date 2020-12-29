import Transaction from '../models/transaction.model';

/**
 * Get all customers.
 *
 * @returns {Promise}
 */
export function finaAllByUserId(id) {

  return Transaction.forge().fetchAll();
}
