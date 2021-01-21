import bookshelf from '../config/bookshelf';

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
    return ['password', 'token', 'created_at', 'updated_at', 'template', 'otp_code', 'confirmationUrl'];
  }
}

export default Customer;
