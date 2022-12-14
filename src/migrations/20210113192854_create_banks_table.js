/**
 * Create banks table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.up = function (knex) {
  return knex.schema.createTable('banks', (table) => {
    table.increments('id').primary().unsigned();
    table.string('name').notNullable();
    table.string('status').notNullable().defaultTo('active').comment(' active, inactive');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable();
  });
};

/**
 * Drop banks table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.down = function (knex) {
  return knex.schema.dropTable('banks');
};
