import bookshelf from '../config/bookshelf';
import Bank from './bank.model';

const TABLE_NAME = 'customer_banks';

/**
 * Customer Bank Model.
 */
class CustomerBank extends bookshelf.Model {

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
    return ['bank_id', 'created_at', 'updated_at'];
  }


  /**
   * Create relation with Bank
   *
   * @returns {Bookshelf.Model}
   */
  bank () {
    return this.belongsTo(Bank, 'bank_id');
  }

}

export default CustomerBank;
