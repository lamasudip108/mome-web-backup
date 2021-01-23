import * as CustomerService from '@services/customer.service';

exports.seed = function(knex) {

  const ids = [];
  let script = [];

  // Deletes ALL existing entries
  return knex('requests').del()
    .then(function() {

      return CustomerService.getAll()
        .then((data) => {
            data.map(d => {
              ids.push(d.attributes.id);
            });

            const random = Math.floor(Math.random() * ids.length);

            script = [
              {
                sender_customer_id: ids[Math.floor(Math.random() * ids.length)],
                receiver_customer_id: ids[Math.floor(Math.random() * ids.length)],
                amount: 465,
                type: 'send',
                notes: 'enjoy',
                status: 'completed',
                created_at: new Date(),
                updated_at: new Date(),
              },
              {
                sender_customer_id: ids[Math.floor(Math.random() * ids.length)],
                receiver_customer_id: ids[Math.floor(Math.random() * ids.length)],
                amount: 432,
                type: 'send',
                notes: 'enjoy',
                status: 'cancelled',
                created_at: new Date(),
                updated_at: new Date(),
              },
              {
                sender_customer_id: ids[Math.floor(Math.random() * ids.length)],
                receiver_customer_id: ids[Math.floor(Math.random() * ids.length)],
                amount: 532,
                type: 'send',
                notes: 'enjoy',
                status: 'failed',
                created_at: new Date(),
                updated_at: new Date(),
              },
              {
                sender_customer_id: ids[Math.floor(Math.random() * ids.length)],
                receiver_customer_id: ids[Math.floor(Math.random() * ids.length)],
                amount: 425,
                type: 'request',
                status: 'completed',
                created_at: new Date(),
                updated_at: new Date(),
              },
            ];

            return knex('requests').insert(script);
          },
        )
        .catch((err) => console.log(err, 'er'));
    });
};
