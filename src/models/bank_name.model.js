import bookshelf from '../config/bookshelf';
import Bank from "./bank.model";

const TABLE_NAME = 'bank_names';

/**
 * Transaction model.
 */
class BankName extends bookshelf.Model {

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
    return ['status', 'created_at', 'updated_at'];
  }

  static getBankNameById(id) {
    return BankName.forge().where({ id: id }).fetchAll();
  }

  bankName() {
    return this.belongsTo('banks', 'bank_id');
  }

}

export default BankName;
