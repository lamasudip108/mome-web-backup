import bookshelf from "../config/bookshelf";
import Bank from "./bank.model";
import Customer from "./customer.model";

const TABLE_NAME = "customer_contacts";

/**
 * Customer Contact Model.
 */
class CustomerContact extends bookshelf.Model {

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
  get hidden() {
    return ["customer_id", "contact_id", "created_at", "updated_at"];
  }

  contact() {
    return this.belongsTo(Customer, "contact_id");
  }

  customer() {
    return this.belongsTo(Customer, "customer_id");
  }

}

export default CustomerContact;
