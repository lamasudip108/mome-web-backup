/**
 * Create users table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.up = function (knex) {
  return knex.schema.createTable('merchants', (table) => {
    table.increments('id').primary().unsigned();
    table.string('cr_number').notNullable().unique();
    table.string('name').notNullable();
    table.string('email').notNullable().unique('mer_email');
    table.string('password').notNullable();
    table.string('phone').notNullable().unique('mer_phone');
    table.string('profile_image').nullable();
    table.string('language').nullable().defaultTo('en').comment('en, ar');
    table.double('total_sales', 10, 2).default(0);
    table.bool('is_verified').default(0).comment('0: not verified, 1: verified');
    table.string('status').default('invited').comment('invited, inactive, active, deleted');
    table.string('street').nullable();
    table.string('city').nullable();
    table.string('state_province').nullable();
    table.string('po_box').nullable();
    table.string('token').nullable();
    table.string('otp_code').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    //table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable();
  });
};

/**
 * Drop users table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.down = function (knex) {
  return knex.schema.dropTable('merchants');
};
