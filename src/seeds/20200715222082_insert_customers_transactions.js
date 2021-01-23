import * as CustomerService from '@services/customer.service';

exports.seed = function(knex) {

  const ids = [];
  let script = [];

  // Deletes ALL existing entries
  return knex('transactions').del()
    .then(function() {

      return CustomerService.getAll()
        .then((data) => {
            data.map(d => {
              ids.push(d.attributes.id);
            });

            const random = Math.floor(Math.random() * ids.length);

            script = [
              {
                customer_id: ids[random],
                merchant_id: ids[random],
                product_name: 'White',
                amount: 23.45,
                commission: 0.56,
                status: 'completed',
                created_at: new Date(),
                updated_at: new Date(),
              },
              {
                customer_id: ids[random],
                merchant_id: ids[random],
                product_name: '23345335353',
                amount: 75.64,
                commission: 0.56,
                status: 'completed',
                created_at: new Date(),
                updated_at: new Date(),
              },
              {
                customer_id: ids[random],
                merchant_id: ids[random],
                product_name: '23453353353',
                amount: 85.64,
                commission: 0.56,
                status: 'completed',
                created_at: new Date(),
                updated_at: new Date(),
              },
              {
                customer_id: ids[random],
                merchant_id: ids[random],
                product_name: '23453335353',
                amount: 43.64,
                commission: 0.56,
                status: 'completed',
                description: 'I love bag',
                created_at: new Date(),
                updated_at: new Date(),
              },
              {
                customer_id: ids[random],
                merchant_id: ids[random],
                product_name: '23452335353',
                amount: 49.64,
                commission: 0.56,
                status: 'completed',
                created_at: new Date(),
                updated_at: new Date(),
              },
              {
                customer_id: ids[random],
                merchant_id: ids[random],
                product_name: '23424234234',
                amount: 43.64,
                commission: 0.56,
                status: 'completed',
                created_at: new Date(),
                updated_at: new Date(),
              },
              {
                customer_id: ids[random],
                merchant_id: ids[random],
                product_name: '23423423423',
                amount: 49.64,
                commission: 0.56,
                status: 'completed',
                created_at: new Date(),
                updated_at: new Date(),
              },
            ];

            return knex('transactions').insert(script);
          },
        )
        .catch((err) => console.log(err, 'er'));
    });
};
