import bookshelf from '../config/bookshelf';

const TABLE_NAME = 'wallets';

/**
 * Transaction model.
 */
class Wallet extends bookshelf.Model {

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

export default Wallet;