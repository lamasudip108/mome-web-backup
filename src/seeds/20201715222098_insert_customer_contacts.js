import * as CustomerService from '@services/customer.service';

exports.seed = function(knex) {

  const ids = [];
  let script = [];

  // Deletes ALL existing entries
  return knex('customer_contacts').del()
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
                contact_id: ids[random],
                created_at: new Date(),
                updated_at: new Date(),
              },
              {
                customer_id: ids[random],
                contact_id: ids[random],
                created_at: new Date(),
                updated_at: new Date(),
              },
              {
                customer_id: ids[random],
                contact_id: ids[random],
                created_at: new Date(),
                updated_at: new Date(),
              },
              {
                customer_id: ids[random],
                contact_id: ids[random],
                created_at: new Date(),
                updated_at: new Date(),
              },
              {
                customer_id: ids[random],
                contact_id: ids[random],
                created_at: new Date(),
                updated_at: new Date(),
              },
              {
                customer_id: ids[random],
                contact_id: ids[random],
                created_at: new Date(),
                updated_at: new Date(),
              },
              {
                customer_id: ids[random],
                contact_id: ids[random],
                created_at: new Date(),
                updated_at: new Date(),
              },
              {
                customer_id: ids[random],
                contact_id: ids[random],
                created_at: new Date(),
                updated_at: new Date(),
              },
            ];

            return knex('customer_contacts').insert(script);
          },
        )
        .catch((err) => console.log(err, 'er'));
    });
};
