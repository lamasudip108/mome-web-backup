
/**
 * Delete all existing entries and seed users table.
 *
 * @param   {Object} knex
 * @returns {Promise}
 */
exports.seed = function(knex) {
  return knex('merchants')
    .del()
    .then(() => {
      return knex('merchants').insert([
        {
          name:'StarBucks',
          cr_number: '9274284792',
          email: 'starbucks@gmail.com',
          password: '$2b$10$Kl3EhYqci30qaGiKL1sQJ..XAoXwE9VAuFHKotA/sovK3krg7uHFO',
          phone: '2343533242',
          status: 'active',
          is_verified: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name:'Adidas',
          cr_number: '4535354354',
          email: 'adidas@gmail.com',
          password: '$2b$10$Kl3EhYqci30qaGiKL1sQJ..XAoXwE9VAuFHKotA/sovK3krg7uHFO',
          phone: '23424524342',
          status: 'active',
          is_verified: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name:'Amazon',
          cr_number: '4564635345',
          email: 'amazon@gmail.com',
          password: '$2b$10$Kl3EhYqci30qaGiKL1sQJ..XAoXwE9VAuFHKotA/sovK3krg7uHFO',
          phone: '98413245345',
          status: 'active',
          is_verified: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
    });
};
