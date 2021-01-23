import bookshelf from '../config/bookshelf';
import Transaction from "./transaction.model";

const TABLE_NAME = 'merchants';

/**
 * Customer Model.
 */
class Merchant extends bookshelf.Model {
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
  get hidden(){
    return ['password', 'token', 'created_at', 'updated_at', 'otp'];
  }

  /**
   * Create relation with customers bank
   *
   * @returns {Collection}
   */
  transaction() {
    return this.hasMany(Transaction, 'merchant_id');
  }
}

export default Merchant;
