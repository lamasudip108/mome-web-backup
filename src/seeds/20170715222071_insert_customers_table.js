/**
 * Delete all existing entries and seed users table.
 *
 * @param   {Object} knex
 * @returns {Promise}
 */
exports.seed = function(knex) {
  return knex('customers')
    .del()
    .then(() => {
      return knex('customers').insert([
        {
          first_name: 'Krishna',
          last_name: 'Timilsina',
          email: 'customer@gmail.com',
          password: '$2b$10$Kl3EhYqci30qaGiKL1sQJ..XAoXwE9VAuFHKotA/sovK3krg7uHFO',
          phone: '1234567890',
          status: 0,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
    });
};
