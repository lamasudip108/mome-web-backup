import * as CustomerService from '../services/customer.service';

exports.seed = function(knex) {

  const ids = [];
  let script = [];

  // Deletes ALL existing entries
  return knex('address').del()
    .then(function() {

      return  CustomerService.getAllCustomer()
        .then((data) => {
            data.map(d => {
              ids.push(d.attributes.id);
            });

            const random = Math.floor(Math.random() * ids.length);

            script = [
              {
                address_po_box: '342',
                city: 'Sydney',
                zip: '09',
                state: 'nsw',
                province: 'campsie',
                country: 'Australia',
                customer_id: ids[random],
                type: 'office',
                created_at: new Date(),
                updated_at: new Date()
              },
              {
                address_po_box: '546',
                city: 'Kathmandu',
                zip: '09',
                state: 'Madhyamanchal',
                province: 'Bagmati ',
                country: 'Nepal',
                customer_id: ids[random],
                type: 'home',
                created_at: new Date(),
                updated_at: new Date()
              },
            ];

            return knex('address').insert(script);

          }
        )
        .catch((err) => console.log(err, 'er'));
    });
};
