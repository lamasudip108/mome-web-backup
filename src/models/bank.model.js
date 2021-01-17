import bookshelf from '../config/bookshelf';
import CustomerBank from './customer_bank.model';

const TABLE_NAME = 'banks';

/**
 * Bank Model.
 */
class Bank extends bookshelf.Model {

  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  /**
   * Table has timestamps.
   */
  get hasTimestamps() {
    return true;
  }

  /**
   * Hide the fields in the response
   *
   * @returns {string[]}
   */
  get hidden() {
    return ['status', 'created_at', 'updated_at'];
  }

  static getNameById(id) {
    return Bank.forge().where({ id: id }).fetchAll();
  }

  /**
   * Create relation with customers bank
   *
   * @returns {Collection}
   */
  bankName() {
    return this.hasMany(CustomerBank, 'bank_id');
  }

}

export default Bank;
