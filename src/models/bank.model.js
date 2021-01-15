import bookshelf from '../config/bookshelf';
import BankName from './bank_name.model';

const TABLE_NAME = 'banks';

/**
 * Transaction model.
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
  get hidden(){
    return ['bank_id', 'created_at', 'updated_at'];
  }


  /**
   * Create relation with BankName
   *
   * @returns {Bookshelf.Model}
   */
  bank () {
    return this.belongsTo(BankName, 'bank_id');
  }

}

export default Bank;
