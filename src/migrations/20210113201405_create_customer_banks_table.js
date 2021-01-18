/**
 * Create customer_banks table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.up = function(knex) {
  return knex.schema.createTable('customer_banks', (table) => {
    table.increments('id').primary().unsigned();
    table.integer('customer_id').unsigned().index().references('id').inTable('customers');
    table.integer('bank_id').unsigned().index().references('id').inTable('banks');
    table.string('branch');
    table.string('account_holder').notNullable();
    table.string('account_number').notNullable().unique();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable();
  });
};

/**
 * Drop customer_banks table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.down = function(knex) {
  return knex.schema.dropTable('customer_banks');
};
