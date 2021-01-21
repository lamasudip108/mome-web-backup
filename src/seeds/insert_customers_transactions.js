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
                amount: " paradise",
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
                vendor_name: " puma",
                amount: 75.64,
                status: "success",
                type: "qr",
                fees: 0.56,
                description: "I am good",
                customer_id: ids[random],
                merchant_id: ids[random],
                created_at: new Date(),
                updated_at: new Date()
              },
              {
                number: "23453353353",
                vendor_name: " rolex",
                amount: 85.64,
                status: "success",
                type: "qr",
                fees: 0.56,
                description: "best product",
                customer_id: ids[random],
                merchant_id: ids[random],
                created_at: new Date(),
                updated_at: new Date()
              },
              {
                number: "23453335353",
                vendor_name: " channel",
                amount: 43.64,
                status: "success",
                type: "qr",
                fees: 0.56,
                description: "I love bag",
                customer_id: ids[random],
                merchant_id: ids[random],
                created_at: new Date(),
                updated_at: new Date()
              },
              {
                number: "23452335353",
                vendor_name: " adidas",
                amount: 49.64,
                status: "success",
                type: "qr",
                fees: 0.56,
                description: "I don't like it",
                customer_id: ids[random],
                merchant_id: ids[random],
                created_at: new Date(),
                updated_at: new Date()
              },
              {
                number: "23424234234",
                vendor_name: " channel",
                amount: 43.64,
                status: "success",
                type: "qr",
                fees: 0.56,
                description: "I love bag",
                customer_id: ids[random],
                merchant_id: ids[random],
                created_at: new Date(),
                updated_at: new Date()
              },
              {
                number: "23423423423",
                vendor_name: " adidas",
                amount: 49.64,
                status: "success",
                type: "qr",
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
