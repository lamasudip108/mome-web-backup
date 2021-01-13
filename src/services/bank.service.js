import BankService from '../models/bank_name.model';


/**
 * Get all transaction
 *
 * @returns {Promise}
 */
export function getAll() {
  return BankService.forge().fetchAll();
}
