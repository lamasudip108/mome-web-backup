import Bank from '@models/bank.model';


/**
 * Get all banks
 *
 * @returns {Promise}
 */
export function getAll() {
  return Bank.forge().where({ status: 'active' }).fetchAll();
}
