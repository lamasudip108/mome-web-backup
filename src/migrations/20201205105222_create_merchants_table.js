/**
 * Create users table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.up = function(knex) {
  return knex.schema.createTable('merchants', (table) => {
    table.increments('id').primary().unsigned();
    table.string('cr_number').notNullable().unique();
    table.string('name').notNullable();
    table.text('description').nullable();
    table.string('email').notNullable().unique('merchant_email');
    table.string('password').notNullable();
    table.string('phone').notNullable().unique('merchant_phone');
    table.string('logo').nullable();
    table.string('status').default('pending').comment('pending, active, inactive, deleted');
    table.string('street').nullable();
    table.string('city').nullable();
    table.string('province').nullable();
    table.string('post_box').nullable();
    table.string('token').nullable();
    table.string('otp').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable();
  });
};

/**
 * Drop users table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.down = function(knex) {
  return knex.schema.dropTable('merchants');
};
