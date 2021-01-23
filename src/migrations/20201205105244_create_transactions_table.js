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
    table.string('txn_number').notNullable().unique();
    table.string('vendor_name').notNullable();
    table.double('amount', 10, 2).notNullable();
    table.string('status').notNullable().comment('pending, success, failed, cancelled, server');
    table.string('type').nullable().comment('qr, contacts').defaultTo('qr');
    table.double('fees', 10, 2).notNullable();
    table.text('notes').nullable();
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
