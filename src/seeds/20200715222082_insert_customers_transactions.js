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
                notes :'test note',
                status: 'completed',
                created_at: new Date(),
                updated_at: new Date(),
              },
              {
                customer_id: ids[random],
                merchant_id: ids[random],
                product_name: 'Green',
                amount: 23.45,
                commission: 0.56,
                notes :'test note',
                status: 'completed',
                created_at: new Date(),
                updated_at: new Date(),
              },
              {
                customer_id: ids[random],
                merchant_id: ids[random],
                product_name: 'Blue',
                amount: 23.45,
                commission: 0.56,
                notes :'test note',
                status: 'completed',
                created_at: new Date(),
                updated_at: new Date(),
              },
              {
                customer_id: ids[random],
                merchant_id: ids[random],
                product_name: 'Shoes',
                amount: 23.45,
                commission: 0.56,
                notes :'test note',
                status: 'completed',
                created_at: new Date(),
                updated_at: new Date(),
              },
              {
                customer_id: ids[random],
                merchant_id: ids[random],
                product_name: 'Dress',
                amount: 23.45,
                commission: 0.56,
                notes :'test note',
                status: 'completed',
                created_at: new Date(),
                updated_at: new Date(),
              },
              {
                customer_id: ids[random],
                merchant_id: ids[random],
                product_name: 'Facebook',
                amount: 23.45,
                commission: 0.56,
                notes :'test note',
                status: 'completed',
                created_at: new Date(),
                updated_at: new Date(),
              },
              {
                customer_id: ids[random],
                merchant_id: ids[random],
                product_name: 'Sweet',
                amount: 23.45,
                commission: 0.56,
                notes :'test note',
                status: 'completed',
                created_at: new Date(),
                updated_at: new Date(),
              },
              {
                customer_id: ids[random],
                merchant_id: ids[random],
                product_name: 'Test',
                amount: 23.45,
                commission: 0.56,
                notes :'test note',
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
