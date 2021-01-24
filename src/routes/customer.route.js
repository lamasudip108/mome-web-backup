import express from 'express';

import * as customerCtrl from '@controllers/customer.controller';
import validate from '@config/joi.validate';
import customerSchema from '@validators/customer.validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: customers
 *     description: Customers Operations
 */

/**
 * @swagger
 * definitions:
 *   Customer:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Unique identifier representing a specific customer
 *       first_name:
 *         type: string
 *         description: first name of the customer
 *         required: true
 *         example: Krishna
 *       middle_name:
 *         type: string
 *         description: last name of the customer
 *         example: Prasad
 *       last_name:
 *         type: string
 *         description: last name of the customer
 *         required: true
 *         example: Timilsina
 *       email:
 *         type: string
 *         description: email of the customer
 *         required: true
 *         example: test@gmail.com
 *       phone:
 *         type: string
 *         description: phone of the customer
 *         required: true
 *         example: "1234567891"
 *       password:
 *         type: string
 *         description: password of the customer
 *         required: true
 *         example: "123456"
 *       profile_image:
 *         type: string
 *         description: photo of the customer
 *       wallet_amount:
 *         type: integer
 *         description: current wallet amount of the customer
 *         example: 123
 *       total_purchase:
 *         type: integer
 *         description: current total purchase amount of the customer
 *         example: 1234
 *       total_purchase_qty:
 *         type: integer
 *         description: current total purchase quantity of the customer
 *         example: 12
 *       token:
 *         type: string
 *         description: token of the customer for forgot password
 *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE1MDk5ODg2NDZ9.1zTKAzXmuyQDHw4uJXa324fFS1yZwlriFSppvK6nOQY
 *       otp:
 *         type: integer
 *         description: otp code of the customer
 *         example: 1234
 *       street:
 *         type: string
 *         description: street of the customer
 *         example: Samakhusi
 *       city:
 *         type: string
 *         description: city of the customer
 *         example: Kathmandu
 *       province:
 *         type: string
 *         description: province of the customer
 *         example: Bagmati
 *       post_box:
 *         type: string
 *         description: post box of the customer
 *         example: "12"
 *       status:
 *         type: integer
 *         description: status of the customer
 *         example: pending
 *       created_at:
 *         type: string
 *         format: date-time
 *         description: customer creation datetime
 *       updated_at:
 *         type: string
 *         format: date-time
 *         description: customer update datetime
 */


/**
 * @swagger
 * definitions:
 *   SuccessTrueMessage:
 *     type: object
 *     properties:
 *       success:
 *         type: string
 *         description: status of api
 *         example: true
 *       data:
 *         type: string
 *         description: message
 *         example: message
 */

/**
 * @swagger
 * definitions:
 *   SuccessFalseMessage:
 *     type: object
 *     properties:
 *       success:
 *         type: string
 *         description: status of api
 *         example: false
 *       data:
 *         type: string
 *         description: message
 *         example: message
 */

router
  .route('/')

  /**
   * @swagger
   * definitions:
   *   NewCustomerPayload:
   *     type: object
   *     properties:
   *       first_name:
   *         type: string
   *         description: first name of the customer
   *         example: Krishna
   *       last_name:
   *         type: string
   *         description: last name of the customer
   *         example: Timilsina
   *       email:
   *         type: string
   *         description: email of the customer
   *         required: true
   *         example: test@gmail.com
   *       phone:
   *         type: string
   *         description: phone of the customer
   *         required: true
   *         example: "1234567891"
   *       password:
   *         type: string
   *         description: password of the customer
   *         required: true
   *         example: "123456"
   */

  /**
   * @swagger
   * /customers:
   *   post:
   *     tags:
   *       - customers
   *     summary: "Create a new customer and send notification to customer email"
   *     security:
   *        - Bearer: []
   *     operationId: storeCustomer
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         description: Created customer object
   *         required: true
   *         schema:
   *           $ref: "#/definitions/NewCustomerPayload"
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *             type: object
   *             properties:
   *               success:
   *                 type: boolean
   *                 default: true
   *               data:
   *                 type: object
   *                 $ref: "#/definitions/Customer"
   *       400:
   *           description: ValidationError
   *           schema:
   *              $ref: '#/definitions/Error'
   *       401:
   *           description: Unauthorized
   *           schema:
   *              $ref: '#/definitions/Error'
   *       404:
   *          description: Customer not found
   *          schema:
   *             $ref: '#/definitions/Error'
   */

  .post(validate(customerSchema.store), customerCtrl.store)

  /**
   * @swagger
   * /customers:
   *   get:
   *     tags:
   *       - customers
   *     summary: "List all customers"
   *     security:
   *        - Bearer: []
   *     operationId: findAll
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters: []
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *             type: object
   *             properties:
   *               success:
   *                 type: boolean
   *                 default: true
   *               data:
   *                 type: array
   *                 items:
   *                   $ref: '#/definitions/Customer'
   *       401:
   *           description: Unauthorized
   *           schema:
   *              $ref: '#/definitions/Error'
   *       404:
   *          description: User not found
   *          schema:
   *             $ref: '#/definitions/Error'
   */

  .get(customerCtrl.findAll);

router
  .route('/:id')

  /**
   * @swagger
   * /customers/{id}:
   *   get:
   *     tags:
   *       - customers
   *     summary: Find the customers by ID
   *     security:
   *        - Bearer: []
   *     operationId: findById
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         description: id of customer that needs to be fetched
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *             type: object
   *             properties:
   *               success:
   *                 type: boolean
   *                 default: true
   *               data:
   *                 type: object
   *                 $ref: "#/definitions/Customer"
   *       401:
   *           description: Unauthorized
   *           schema:
   *              $ref: '#/definitions/Error'
   *       404:
   *          description: Customer not found
   *          schema:
   *             $ref: '#/definitions/Error'
   */

  .get(customerCtrl.findById)


  /**
   * @swagger
   * definitions:
   *   UpdateCustomerPayload:
   *     type: object
   *     properties:
   *       first_name:
   *         type: string
   *         description: first name of the customer
   *         example: Krishna
   *       last_name:
   *         type: string
   *         description: last name of the customer
   *         example: Timilsina
   *       email:
   *         type: string
   *         description: email of the customer
   *         required: true
   *         example: test@gmail.com
   *       phone:
   *         type: string
   *         description: phone of the customer
   *         required: true
   *         example: "1234567891"
   *       password:
   *         type: string
   *         description: password of the customer
   *         required: true
   *         example: "123456"
   *       street:
   *         street: string
   *         description: street name of the customer
   *         example: 40 Fourth Avenue
   *       city:
   *         type: string
   *         description: city of the customer
   *         required: true
   *         example: Sydney
   *       province:
   *         type: string
   *         description: province of the customer
   *         required: New South Wales
   *         example: New South Wales
   *       post_box:
   *         type: string
   *         description: post box of the customer
   *         required: true
   *         example: "4342"
   */

  /**
   * @swagger
   * /customers/{id}:
   *   put:
   *     tags:
   *       - customers
   *     summary: "Update an existing customer by ID"
   *     security:
   *       - Bearer: []
   *     operationId: update
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         description: id that need to be updated
   *         required: true
   *         type: integer
   *       - name: body
   *         in: body
   *         description: Updated customers object
   *         required: true
   *         schema:
   *           $ref: "#/definitions/UpdateCustomerPayload"
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *             type: object
   *             properties:
   *               success:
   *                 type: boolean
   *                 default: true
   *               data:
   *                 type: object
   *                 $ref: "#/definitions/Customer"
   *       400:
   *           description: ValidationError
   *           schema:
   *              $ref: '#/definitions/Error'
   *       401:
   *           description: Unauthorized
   *           schema:
   *              $ref: '#/definitions/Error'
   *       404:
   *          description: Customer not found
   *          schema:
   *             $ref: '#/definitions/Error'
   */

  .put(validate(customerSchema.update), customerCtrl.update)

  /**
   * @swagger
   * /customers/{id}:
   *   delete:
   *     tags:
   *       - customers
   *     summary: Delete the customer by ID
   *     security:
   *       - Bearer: []
   *     operationId: destroy
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         description: id of customer that needs to be deleted
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: OK
   *       401:
   *           description: Unauthorized
   *           schema:
   *              $ref: '#/definitions/Error'
   *       400:
   *          description: Invalid ID
   *          schema:
   *             $ref: '#/definitions/Error'
   *       404:
   *          description: User not found
   *          schema:
   *             $ref: '#/definitions/Error'
   */

  .delete(customerCtrl.destroy);

router
  .route('/isUniqueEmail')

  /**
   * @swagger
   * definitions:
   *   CheckUniqueEmailPayload:
   *     type: object
   *     properties:
   *       email:
   *         type: string
   *         description: email of the customer
   *         required: true
   *         example: sunarban007@gmail.com
   */

  /**
   * @swagger
   * /customers/isUniqueEmail:
   *   post:
   *     tags:
   *       - customers
   *     summary: "Check email existence for customer if  exist return true"
   *     security:
   *        - Bearer: []
   *     operationId: isUniqueEmail
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         description: Enter the email to check
   *         required: true
   *         schema:
   *           $ref: "#/definitions/CheckUniqueEmailPayload"
   *     responses:
   *       200:
   *         description: OK
   */

  .post(validate(customerSchema.email), customerCtrl.isUniqueEmail);

router
  .route('/:id/update-password')

  /**
   * @swagger
   * definitions:
   *   UpdatePasswordPayload:
   *     type: object
   *     properties:
   *       old_password:
   *         type: string
   *         description: first name of the customer
   *         example: oldpwd
   *       new_password:
   *         type: string
   *         description: last name of the customer
   *         example: newpwd
   *       confirm_password:
   *         type: string
   *         description: email of the customer
   *         required: true
   *         example: newpwd
   */


  /**
   * @swagger
   * /customers/{id}/update-password:
   *   put:
   *     tags:
   *       - customers
   *     summary: "Update new password for logged in user"
   *     security:
   *        - Bearer: []
   *     operationId: updatePassword
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         description: Update new password for logged in user
   *         required: true
   *         schema:
   *           $ref: "#/definitions/UpdatePasswordPayload"
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: "#/definitions/SuccessTrueMessage"
   *       403:
   *         description: Forbidden
   *         schema:
   *           $ref: "#/definitions/SuccessFalseMessage"
   */

  .put(validate(customerSchema.updatePassword), customerCtrl.updatePassword);

router
  .route('/forgot-password-notification')

  /**
   * @swagger
   * definitions:
   *   ForgotPasswordPayload:
   *     type: object
   *     properties:
   *       email:
   *         type: string
   *         description: email of the customer
   *         required: true
   *         example: sunarban007@gmail.com
   */

  /**
   * @swagger
   * /customers/forgot-password-notification:
   *   post:
   *     tags:
   *       - customers
   *     summary: "Send forgot password notification to customer email"
   *     security:
   *        - Bearer: []
   *     operationId: forgot-password
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         description: Forgot password for customer
   *         required: true
   *         schema:
   *           $ref: "#/definitions/ForgotPasswordPayload"
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: "#/definitions/SuccessTrueMessage"
   *       403:
   *         description: Forbidden
   *         schema:
   *           $ref: "#/definitions/SuccessFalseMessage"
   *       404:
   *          description: Customer not found
   *          schema:
   *             $ref: '#/definitions/Error'
   */

  .post(validate(customerSchema.email), customerCtrl.forgotPasswordNotification);

router
  .route('/:id/banks')

  /**
   * @swagger
   * definitions:
   *   AddBankPayload:
   *     type: object
   *     properties:
   *       bank_id:
   *         type: string
   *         description: id of the bank
   *         required: true
   *         example: 2
   *       branch_name:
   *         type: string
   *         description: bank's branch name
   *         required: true
   *         example: Doha
   *       account_holder:
   *         type: string
   *         description: account holder name
   *         required: true
   *         example: Sundar Ban
   *       account_number:
   *         type: string
   *         description: bank's account number
   *         required: true
   *         example: 23425354354
   */


  /**
   * @swagger
   * /customers/{id}/banks:
   *   post:
   *     tags:
   *       - customers
   *     summary: "Create a bank for customer"
   *     security:
   *        - Bearer: []
   *     operationId: banks
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         description: Create a new bank for customer
   *         required: true
   *         schema:
   *           $ref: "#/definitions/AddBankPayload"
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: "#/definitions/SuccessTrueMessage"
   *       403:
   *         description: Forbidden
   *         schema:
   *           $ref: "#/definitions/SuccessFalseMessage"
   */
  .post(validate(customerSchema.addBank), customerCtrl.addBank)

  /**
   * @swagger
   * definitions:
   *   FetchCustomerBankPayload:
   *     type: object
   *     properties:
   *       id:
   *         type: string
   *         description: id of the bank
   *         required: true
   *         example: 2
   *       customer_id:
   *         type: string
   *         description: bank's branch name
   *         required: true
   *         example: Doha
   *       branch_name:
   *         type: string
   *         description: account holder name
   *         required: true
   *         example: Sundar Ban
   *       account_holder:
   *         type: string
   *         description: bank's account number
   *         required: true
   *         example: 04102524736
   *       account_number:
   *         type: string
   *         description: account holder name
   *         required: true
   *         example: Sundar Ban
   *       bank:
   *          type: object
   *          properties:
   *            id:
   *              type: string
   *              description: id of the bank
   *              required: true
   *              example: 2
   *            name:
   *              type: string
   *              description: name of the bank
   *              required: true
   *              example: Qatar International Islamic Bank
   */

  /**
   * @swagger
   * /customers/{id}/banks:
   *   get:
   *     tags:
   *       - customers
   *     summary: "Fetch all customer's bank"
   *     security:
   *        - Bearer: []
   *     operationId: banks
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         description: fetch all customer's bank
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: "#/definitions/FetchCustomerBankPayload"
   */

  .get(customerCtrl.findAllBankById);

router
  .route('/:id/send-money')

  /**
   * @swagger
   * definitions:
   *   SendMoneyPayload:
   *     type: object
   *     properties:
   *       email:
   *         type: string
   *         description: email of receiver
   *         required: true
   *         example: sundarban007@gmail.com
   *       phone:
   *         type: string
   *         description: phone no of receiver
   *         required: true
   *         example: 0410265725
   *       amount:
   *         type: string
   *         description: amount to send
   *         required: true
   *         example: 500
   *       note:
   *         type: string
   *         description: example note
   *         required: true
   *         example: example note
   */

  /**
   * @swagger
   * /customers/{id}/send-money:
   *   post:
   *     tags:
   *       - customers
   *     summary: "Send Money from ewallet to ewallet"
   *     security:
   *        - Bearer: []
   *     operationId: banks
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         description: Send money from ewallet to ewallet
   *         required: true
   *         schema:
   *           $ref: "#/definitions/SendMoneyPayload"
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: "#/definitions/SuccessTrueMessage"
   *       403:
   *         description: Forbidden
   *         schema:
   *           $ref: "#/definitions/SuccessFalseMessage"
   */

  .post(validate(customerSchema.sendMoney), customerCtrl.sendMoney);

router
  .route('/:id/request-money')

  /**
   * @swagger
   * /customers/{id}/request-money:
   *   post:
   *     tags:
   *       - customers
   *     summary: "Request money from another ewallet customer"
   *     security:
   *        - Bearer: []
   *     operationId: banks
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         description: Request money from ewallet to ewallet
   *         required: true
   *         schema:
   *           $ref: "#/definitions/SendMoneyPayload"
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: "#/definitions/SuccessTrueMessage"
   *       403:
   *         description: Forbidden
   *         schema:
   *           $ref: "#/definitions/SuccessFalseMessage"
   */

  .post(validate(customerSchema.sendMoney), customerCtrl.requestMoney);

router
  .route('/:id/sent-wallet-requests')

  /**
   * @swagger
   * /customers/{id}/sent-wallet-requests:
   *   get:
   *     tags:
   *       - customers
   *     summary: "Show all sent wallet request"
   *     security:
   *        - Bearer: []
   *     operationId: banks
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         description: Show all sent wallet request
   *         required: true
   *         schema:
   *           $ref: "#/definitions/Customer"
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: "#/definitions/Customer"
   */

  .get(customerCtrl.sentWalletRequest);

router
  .route('/:id/received-wallet-requests')

  /**
   * @swagger
   * /customers/{id}/received-wallet-requests:
   *   get:
   *     tags:
   *       - customers
   *     summary: "Show all received wallet request"
   *     security:
   *        - Bearer: []
   *     operationId: banks
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         description: Show all received wallet request
   *         required: true
   *         schema:
   *           $ref: "#/definitions/Customer"
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: "#/definitions/Customer"
   */

  .get(customerCtrl.receivedWalletRequest);

router
  .route('/:id/respond-wallet-request')

  /**
   * @swagger
   * /customers/{id}/receive-wallet-request:
   *   post:
   *     tags:
   *       - customers
   *     summary: "respond to to wallet request"
   *     security:
   *        - Bearer: []
   *     operationId: banks
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         description: Respond to wallet request
   *         required: true
   *         schema:
   *           $ref: "#/definitions/Customer"
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: "#/definitions/Customer"
   */

  .post(validate(customerSchema.respondRequest), customerCtrl.respondWalletRequest);

router
  .route('/:id/transactions')

  /**
   * @swagger
   * /customers/{id}/transactions:
   *   get:
   *     tags:
   *       - customers
   *     summary: "Fetch customer transactions"
   *     security:
   *        - Bearer: []
   *     operationId: banks
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         description: Show all received wallet request
   *         required: true
   *         schema:
   *           $ref: "#/definitions/Customer"
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: "#/definitions/Customer"
   */

  .get(customerCtrl.findAllTransactionByCustomer);

export default router;
