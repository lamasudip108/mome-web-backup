import bookshelf from '../config/bookshelf';
import Merchant from "./merchant.model";
import Customer from "./customer.model";

const TABLE_NAME = 'requests';

/**
 * Wallet Model.
 */
class Request extends bookshelf.Model {

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
    return ['created_at', 'updated_at'];
  }

  sender () {
    return this.belongsTo(Customer, 'sender_customer_id');
  }

  receiver () {
    return this.belongsTo(Customer, 'receiver_customer_id');
  }


}

export default Request;
