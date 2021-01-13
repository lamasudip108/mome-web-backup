import bookshelf from '../config/bookshelf';

const TABLE_NAME = 'transactions';

/**
 * Transaction model.
 */
class Transaction extends bookshelf.Model {

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
    return ['customer_id', 'created_at', 'updated_at'];
  }

}

export default Transaction;
