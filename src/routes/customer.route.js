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
 *   NewCustomerPayload:
 *     type: object
 *     properties:
 *       first_name:
 *         type: string
 *         description: first name of the user
 *         example: Krishna
 *       last_name:
 *         type: string
 *         description: last name of the user
 *         example: Timilsina
 *       email:
 *         type: string
 *         description: email of the user
 *         required: true
 *         example: test@gmail.com
 *       phone:
 *         type: string
 *         description: phone of the customer
 *         required: true
 *         example: "1234567891"
 *       password:
 *         type: string
 *         description: password of the user
 *         required: true
 *         example: "123456"
 */

/**
 * @swagger
 * definitions:
 *   UpdateCustomerPayload:
 *     type: object
 *     properties:
 *       first_name:
 *         type: string
 *         description: first name of the user
 *         example: Krishna
 *       last_name:
 *         type: string
 *         description: last name of the user
 *         example: Timilsina
 *       email:
 *         type: string
 *         description: email of the user
 *         required: true
 *         example: test@gmail.com
 *       phone:
 *         type: string
 *         description: phone of the customer
 *         required: true
 *         example: "1234567891"
 *       password:
 *         type: string
 *         description: password of the user
 *         required: true
 *         example: "123456"
 *       status:
 *         type: integer
 *         description: status of the user
 *         example: 1
 */


router
  .route('/')

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
   *          description: User not found
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
   *          description: User not found
   *          schema:
   *             $ref: '#/definitions/Error'
   */

  .get(customerCtrl.findById)

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
   *                 $ref: "#/definitions/User"
   *       400:
   *           description: ValidationError
   *           schema:
   *              $ref: '#/definitions/Error'
   *       401:
   *           description: Unauthorized
   *           schema:
   *              $ref: '#/definitions/Error'
   *       404:
   *          description: User not found
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
   * /customers/isUniqueEmail:
   *   post:
   *     tags:
   *       - customers
   *     summary: "Check email existence for customer"
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
   *         description: Check email existence
   *         required: true
   *         schema:
   *           $ref: "#/definitions/Customer"
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: "#/definitions/Customer"
   */

  .post(validate(customerSchema.email), customerCtrl.isUniqueEmail);

router
  .route('/:id/update-password')

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
   *           $ref: "#/definitions/Customer"
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: "#/definitions/Customer"
   */

  .put(validate(customerSchema.updatePassword), customerCtrl.updatePassword);

router
  .route('/forgot-password-notification')

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
   *         description: Update new password for logged in user
   *         required: true
   *         schema:
   *           $ref: "#/definitions/Customer"
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: "#/definitions/Customer"
   */

  .post(validate(customerSchema.email), customerCtrl.forgotPasswordNotification);

router
  .route('/:id/banks')

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
   *           $ref: "#/definitions/Customer"
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: "#/definitions/Customer"
   */
  .post(validate(customerSchema.addBank), customerCtrl.addBank)

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
   *           $ref: "#/definitions/Customer"
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: "#/definitions/Customer"
   */

  .get(customerCtrl.findAllBankById);

router
  .route('/:id/send-money')

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
   *           $ref: "#/definitions/Customer"
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: "#/definitions/Customer"
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
   *     summary: "Request money from another ewallet user"
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
   *         description: Request money from another ewallet user
   *         required: true
   *         schema:
   *           $ref: "#/definitions/Customer"
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: "#/definitions/Customer"
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
