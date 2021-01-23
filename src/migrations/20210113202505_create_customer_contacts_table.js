/**
 * Create customer_contacts table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.up = function(knex) {
  return knex.schema.createTable('customer_contacts', (table) => {
    table.increments('id').primary().unsigned();
    table.integer('customer_id').unsigned().index().references('id').inTable('customers');
    table.integer('contact_id').unsigned().index().references('id').inTable('customers');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable();
  });
};

/**
 * Drop customer_contacts table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.down = function(knex) {
  return knex.schema.dropTable('customer_contacts');
};
