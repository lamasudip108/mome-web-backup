import bookshelf from '../config/bookshelf';

const TABLE_NAME = 'customers';

/**
 * Customer model.
 */
class Customer extends bookshelf.Model {
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
}

export default Customer;
