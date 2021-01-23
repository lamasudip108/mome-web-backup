import * as CustomerService from "@services/customer.service";

exports.seed = function(knex) {

  const ids = [];
  let script = [];

  // Deletes ALL existing entries
  return knex("transactions").del()
    .then(function() {

      return CustomerService.getAll()
        .then((data) => {
            data.map(d => {
              ids.push(d.attributes.id);
            });

            const random = Math.floor(Math.random() * ids.length);

            script = [
              {
                number: "2345335353",
                amount: 23.45,
                status: "success",
                fees: 0.56,
                description: "I love shopping",
                customer_id: ids[random],
                merchant_id: ids[random],
                created_at: new Date(),
                updated_at: new Date()
              },
              {
                number: "23345335353",
                amount: 75.64,
                status: "success",
                fees: 0.56,
                description: "I am good",
                customer_id: ids[random],
                merchant_id: ids[random],
                created_at: new Date(),
                updated_at: new Date()
              },
              {
                number: "23453353353",
                amount: 85.64,
                status: "success",
                fees: 0.56,
                description: "best product",
                customer_id: ids[random],
                merchant_id: ids[random],
                created_at: new Date(),
                updated_at: new Date()
              },
              {
                number: "23453335353",
                amount: 43.64,
                status: "success",
                fees: 0.56,
                description: "I love bag",
                customer_id: ids[random],
                merchant_id: ids[random],
                created_at: new Date(),
                updated_at: new Date()
              },
              {
                number: "23452335353",
                amount: 49.64,
                status: "success",
                fees: 0.56,
                description: "I don't like it",
                customer_id: ids[random],
                merchant_id: ids[random],
                created_at: new Date(),
                updated_at: new Date()
              },
              {
                number: "23424234234",
                amount: 43.64,
                status: "success",
                fees: 0.56,
                description: "I love bag",
                customer_id: ids[random],
                merchant_id: ids[random],
                created_at: new Date(),
                updated_at: new Date()
              },
              {
                number: "23423423423",
                amount: 49.64,
                status: "success",
                fees: 0.56,
                description: "I don't like it",
                customer_id: ids[random],
                merchant_id: ids[random],
                created_at: new Date(),
                updated_at: new Date()
              }
            ];

            return knex("transactions").insert(script);
          }
        )
        .catch((err) => console.log(err, "er"));
    });
};
