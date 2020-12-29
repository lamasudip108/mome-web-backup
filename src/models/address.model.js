import bookshelf from '../config/bookshelf';
import Customer from "./customer.model";

const TABLE_NAME = 'address';

/**
 * User model.
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

  user() {
    return this.belongsTo(Customer, 'customer_id', 'id');
  }

  static getAddressById(id) {
    return Address.forge().where({customer_id:id}).fetchAll();
  }

  /**
   * Hide the fields in the response
   *
   * @returns {string[]}
   */
  get hidden(){
    return ['customer_id', 'created_at', 'updated_at'];
  }
}

export default Address;