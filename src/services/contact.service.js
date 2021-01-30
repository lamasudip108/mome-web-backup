import CustomerContact from "../models/customer_contact.model";


/**
 * Get customer contacts
 *
 * @returns {Promise}
 */
export function findMyContacts(criteria) {
  return CustomerContact.forge().where(criteria).fetchAll({ withRelated: ["contact"] });
}
