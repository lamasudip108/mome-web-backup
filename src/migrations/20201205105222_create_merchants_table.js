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
    table.bool('is_verified').default(0).comment('0: pending, 1: verified');
    table.string('status').default('invited').comment('active, inactive, deleted');
    table.string('street').nullable();
    table.string('city').nullable();
    table.string('state_province').nullable();
    table.string('po_box').nullable();
    table.string('token').nullable();
    table.string('otp_code').nullable();
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
