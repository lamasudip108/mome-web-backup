
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('bank_names').del()
    .then(function () {
      // Inserts seed entries
      return knex('bank_names').insert([
        {
          name: 'Qatar National Bank',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Doha Bank',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Commercial Bank',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Qatar International Islamic Bank',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Qatar Islamic Bank',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Qatar Development Bank',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Arab Bank',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Al Ahli Bank',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Mashreq Bank',
          created_at: new Date(),
          updated_at: new Date()
        },     {
          name: 'HSBC Bank Middle East',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'BNP Paribas',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Bank Saderat Iran',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'International Bank of Qatar',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Al khaliji Commercial Bank',
          created_at: new Date(),
          updated_at: new Date()
        },        {
          name: 'Barwa Bank',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Bank Saderat Iran',
          created_at: new Date(),
          updated_at: new Date()
        }
      ]);
    });
};
