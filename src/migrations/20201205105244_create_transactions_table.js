/**
 * Create transactions table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.up = function (knex) {
  return knex.schema.createTable('transactions', (table) => {
    table.increments('id').primary().unsigned();
    table.integer('customer_id').unsigned().index().notNullable().references('id').inTable('customers');
    table.integer('merchant_id').unsigned().index().notNullable().references('id').inTable('merchants');
    table.string('product_name').nullable();
    table.double('amount', 10, 2).notNullable();
    table.double('commission', 10, 2).default(0);
    table.text('notes').nullable();
    table.string('status').notNullable().comment('pending, success, failed, cancelled, server');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable();
  });
};

/**
 * Drop transactions table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.down = function (knex) {
  return knex.schema.dropTable('transactions');
};
