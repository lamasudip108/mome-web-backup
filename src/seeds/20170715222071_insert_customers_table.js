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
          last_name: 'Timalsina',
          email: 'krishna@gmail.com',
          password: '$2b$10$Kl3EhYqci30qaGiKL1sQJ..XAoXwE9VAuFHKotA/sovK3krg7uHFO',
          phone: '9841765345',
          status: 'active',
          wallet_amount:'7640.90',
          total_purchase: '654.85',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          first_name: 'Sundar',
          last_name: 'Ban',
          email: 'sundar@gmail.com',
          password: '$2b$10$Kl3EhYqci30qaGiKL1sQJ..XAoXwE9VAuFHKotA/sovK3krg7uHFO',
          phone: '1234567892',
          status: 'active',
          wallet_amount:'7640.90',
          total_purchase: '654.85',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          first_name: 'Sudip',
          last_name: 'Lama',
          email: 'sudip@gmail.com',
          password: '$2b$10$Kl3EhYqci30qaGiKL1sQJ..XAoXwE9VAuFHKotA/sovK3krg7uHFO',
          phone: '1234567893',
          status:'pending',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
    });
};
