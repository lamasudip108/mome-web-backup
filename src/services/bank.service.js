import BankName from '../models/bank_name.model';


/**
 * Get all banks
 *
 * @returns {Promise}
 */
export function getAll() {
  return BankName.forge().where({status:'active'}).fetchAll();
}
