/**
 * Create customers table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.up = function (knex) {
  return knex.schema.createTable('customers', (table) => {
    table.increments('id').primary().unsigned();
    table.string('first_name').notNullable();
    table.string('middle_name').nullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable().unique('customer_email');
    table.string('phone').notNullable().unique('customer_phone');
    table.string('password').notNullable();
    table.string('profile_image').nullable();
    table.double('wallet_amount', 10, 2).default(0);
    table.double('total_purchase', 10, 2).default(0);
    table.double('total_purchase_qty', 10, 2).default(0);
    table.string('token').nullable();
    table.string('otp').nullable();
    table.string('street').nullable();
    table.string('city').nullable();
    table.string('province').nullable();
    table.string('post_box').nullable();
    table.string('status').default('pending').comment('pending, inactive, active, deleted');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable();
  });
};

/**
 * Drop customers table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.down = function (knex) {
  return knex.schema.dropTable('customers');
};
