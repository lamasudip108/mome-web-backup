/**
 * Create transactions table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.up = function (knex) {
  return knex.schema.createTable('banks', (table) => {
    table.increments('id').primary().unsigned();
    table.string('branch');
    table.string('account_holder').notNullable();
    table.string('account_number').notNullable().unique();
    table.integer('customer_id').unsigned().index().references('id').inTable('customers');
    table.integer('bank_id').unsigned().index().references('id').inTable('bank_names');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    //table.timestamp('updated_at').defaultTo(knex.fn.now());
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
  return knex.schema.dropTable('banks');
};
