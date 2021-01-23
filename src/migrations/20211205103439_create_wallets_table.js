/**
 * Create wallets table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.up = function(knex) {
  return knex.schema.createTable('wallets', (table) => {
    table.increments('id').primary().unsigned();
    table.integer('customer_id').unsigned().index().references('id').inTable('customers');
    table.integer('bank_id').unsigned().index().references('id').inTable('banks');
    table.string('txn_number').notNullable();
    table.double('amount', 10, 2).notNullable();
    table.string('status').notNullable().comment('pending, completed, failed, cancelled');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable();
  });
};

/**
 * Drop wallets table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.down = function(knex) {
  return knex.schema.dropTable('wallets');
};
