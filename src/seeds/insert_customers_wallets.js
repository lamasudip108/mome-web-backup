import * as CustomerService from "@services/customer.service";

exports.seed = function(knex) {

  const ids = [];
  let script = [];

  // Deletes ALL existing entries
  return knex("wallets").del()
    .then(function() {

      return CustomerService.getAll()
        .then((data) => {
            data.map(d => {
              ids.push(d.attributes.id);
            });

            const random = Math.floor(Math.random() * ids.length);

            script = [
              {
                number: "35353524",
                sender: ids[Math.floor(Math.random() * ids.length)],
                receiver: ids[Math.floor(Math.random() * ids.length)],
                is_request: 0,
                amount: 465,
                status: "success",
                fees: 0.56,
                description: "enjoy",
                customer_id: ids[Math.floor(Math.random() * ids.length)],
                created_at: new Date(),
                updated_at: new Date()
              },
              {
                number: "35353we4",
                sender: ids[Math.floor(Math.random() * ids.length)],
                receiver: ids[Math.floor(Math.random() * ids.length)],
                is_request: 0,
                amount: 432,
                status: "cancelled",
                fees: 0.56,
                description: "enjoy",
                customer_id: ids[Math.floor(Math.random() * ids.length)],
                created_at: new Date(),
                updated_at: new Date()
              },
              {
                number: "eweq3424",
                sender: ids[Math.floor(Math.random() * ids.length)],
                receiver: ids[Math.floor(Math.random() * ids.length)],
                is_request: 0,
                amount: 532,
                status: "failed",
                fees: 0.56,
                description: "enjoy",
                customer_id: ids[Math.floor(Math.random() * ids.length)],
                created_at: new Date(),
                updated_at: new Date()
              },
              {
                number: "2423424",
                sender: ids[Math.floor(Math.random() * ids.length)],
                receiver: ids[random],
                is_request: 1,
                amount: 425,
                status: "success",
                fees: 0.56,
                description: "enjoy",
                customer_id: ids[Math.floor(Math.random() * ids.length)],
                created_at: new Date(),
                updated_at: new Date()
              },
            ];

            return knex("wallets").insert(script);
          }
        )
        .catch((err) => console.log(err, "er"));
    });
};
