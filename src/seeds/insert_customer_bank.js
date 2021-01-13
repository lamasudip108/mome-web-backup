import * as CustomerService from '../services/customer.service';

exports.seed = function(knex) {

  const ids = [];
  let script = [];

  // Deletes ALL existing entries
  return knex('banks').del()
    .then(function() {

      return CustomerService.getAllCustomer()
        .then((data) => {
            data.map(d => {
              ids.push(d.attributes.id);
            });

            script = [
              {
                branch: 'Kathmandu',
                account_holder: 'Sundar Ban',
                account_number: 'asfaf34234',
                bank_id: ids[Math.floor(Math.random() * ids.length)],
                customer_id: ids[Math.floor(Math.random() * ids.length)],
                created_at: new Date(),
                updated_at: new Date()
              },
              {
                branch: 'Kathmandu',
                account_holder: 'Sudip Lama',
                account_number: 'asfa32434234',
                bank_id: ids[Math.floor(Math.random() * ids.length)],
                customer_id: ids[Math.floor(Math.random() * ids.length)],
                created_at: new Date(),
                updated_at: new Date()
              },
              {
                branch: 'Chitwan',
                account_holder: 'Krishna Timalsina',
                account_number: 'as23g32434234',
                bank_id: ids[Math.floor(Math.random() * ids.length)],
                customer_id: ids[Math.floor(Math.random() * ids.length)],
                created_at: new Date(),
                updated_at: new Date()
              },
              {
                branch: 'Kathmandu',
                account_holder: 'Sundar Ban',
                account_number: 'asi4324f34234',
                bank_id: ids[Math.floor(Math.random() * ids.length)],
                customer_id: ids[Math.floor(Math.random() * ids.length)],
                created_at: new Date(),
                updated_at: new Date()
              },
              {
                branch: 'Kathmandu',
                account_holder: 'Sudip Lama',
                account_number: '2342324wewrwr',
                bank_id: ids[Math.floor(Math.random() * ids.length)],
                customer_id: ids[Math.floor(Math.random() * ids.length)],
                created_at: new Date(),
                updated_at: new Date()
              },
              {
                branch: 'Chitwan',
                account_holder: 'Krishna Timalsina',
                account_number: '234sdwre',
                bank_id: ids[Math.floor(Math.random() * ids.length)],
                customer_id: ids[Math.floor(Math.random() * ids.length)],
                created_at: new Date(),
                updated_at: new Date()
              }
            ];

            return knex('banks').insert(script);
          }
        )
        .catch((err) => console.log(err, 'er'));
    });
};
