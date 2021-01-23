import * as CustomerService from '@services/customer.service';

exports.seed = function(knex) {

  const ids = [];
  let script = [];

  // Deletes ALL existing entries
  return knex('wallets').del()
    .then(function() {

      return CustomerService.getAll()
        .then((data) => {
            data.map(d => {
              ids.push(d.attributes.id);
            });

            const random = Math.floor(Math.random() * ids.length);

            script = [
              {
                customer_id: ids[Math.floor(Math.random() * ids.length)],
                bank_id: 1,
                txn_number: 1,
                amount: 465,
                status: 'completed',
                created_at: new Date(),
                updated_at: new Date(),
              },
              {
                customer_id: ids[Math.floor(Math.random() * ids.length)],
                bank_id: 1,
                txn_number: 1,
                amount: 465,
                status: 'cancelled',
                created_at: new Date(),
                updated_at: new Date(),
              },
              {
                customer_id: ids[Math.floor(Math.random() * ids.length)],
                bank_id: 1,
                txn_number: 1,
                amount: 465,
                status: 'failed',
                created_at: new Date(),
                updated_at: new Date(),
              },
              {
                customer_id: ids[Math.floor(Math.random() * ids.length)],
                bank_id: 1,
                txn_number: 1,
                amount: 465,
                status: 'completed',
                created_at: new Date(),
                updated_at: new Date(),
              },
            ];

            return knex('wallets').insert(script);
          },
        )
        .catch((err) => console.log(err, 'er'));
    });
};
