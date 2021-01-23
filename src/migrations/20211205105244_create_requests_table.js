/**
 * Create requests table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.up = function(knex) {
  return knex.schema.createTable('requests', (table) => {
    table.increments('id').primary().unsigned();
    table.integer('from_customer_id').unsigned().index().notNullable().references('id').inTable('customers');
    table.integer('to_customer_id').unsigned().index().notNullable().references('id').inTable('customers');
    table.double('amount', 10, 2).notNullable();
    table.text('notes').nullable();
    table.string('type').nullable().comment('send, request').defaultTo('send');
    table.string('status').notNullable().comment('pending, completed, failed, cancelled');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable();
  });
};

/**
 * Drop requests table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.down = function(knex) {
  return knex.schema.dropTable('requests');
};
