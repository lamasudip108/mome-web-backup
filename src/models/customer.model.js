import bookshelf from '../config/bookshelf';
import Request from "./request.model";

const TABLE_NAME = 'customers';

/**
 * Customer Model.
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

  /**
   * Hide the fields in the response
   *
   * @returns {string[]}
   */
  get hidden(){
    return ['password', 'token', 'otp', 'created_at', 'updated_at'];
  }

  senderCustomer() {
    return this.hasMany(Request, 'sender_customer_id');
  }

  receiverCustomer() {
    return this.hasMany(Request, 'receiver_customer_id');
  }
}

export default Customer;
