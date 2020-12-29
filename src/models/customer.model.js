import bookshelf from '../config/bookshelf';
import Address from './address.model';

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

  /**
   * Hide the fields in the response
   *
   * @returns {string[]}
   */
  get hidden(){
    return ['password', 'token', 'created_at', 'updated_at', 'template', 'otp_code', 'confirmationUrl'];
  }

  address() {
    return this.hasMany(Address, 'customer_id', 'id');
  }

}

export default Customer;
