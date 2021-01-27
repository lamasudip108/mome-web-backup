import bookshelf from '../config/bookshelf';
import Merchant from "./merchant.model";
import Customer from "./customer.model";

const TABLE_NAME = 'transactions';

/**
 * Transaction Model.
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
    return ['merchant_id', 'customer_id', 'created_at', 'updated_at'];
  }

  /**
   * Create relation with Merchant
   *
   * @returns {Bookshelf.Model}
   */
  merchant () {
    return this.belongsTo(Merchant, 'merchant_id');
  }

  /**
   * Create relation with Customer
   *
   * @returns {Bookshelf.Model}
   */
  customer () {
    return this.belongsTo(Customer, 'customer_id');
  }
}

export default Transaction;
