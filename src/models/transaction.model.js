import bookshelf from '../config/bookshelf';

const TABLE_NAME = 'transactions';

/**
 * Transaction model.
 */
class Address extends bookshelf.Model {

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


  static getAddressById(id) {
    return Address.forge().where({customer_id:id}).fetchAll();
  }
}

export default Address;