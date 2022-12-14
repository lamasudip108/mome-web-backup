import Transaction from '../models/transaction.model';

/**
 * Get all transaction by customer id
 *
 * @returns {Promise}
 */
export function findAllTransactionByCustomer(id) {
  return Transaction.forge().where({ customer_id: id }).fetchAll({ withRelated: ['merchant', 'customer'] });
}

/**
 * Get all transaction
 *
 * @returns {Promise}
 */
export function getAll() {
  return Transaction.forge().fetchAll();
}

/**
 * Get customer transaction by transaction
 *
 * @returns {Promise}
 */
export function findCustomerTransactionById(criteria) {
  return Transaction.forge().where(criteria).fetchAll({ withRelated: ['merchant', 'customer'] });
}
