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
 *   Customers:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Unique identifier representing a specific customer
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
 *       password:
 *         type: string
 *         description: password of the customer
 *         required: true
 *         example: "123456"
 *       status:
 *         type: integer
 *         description: status of the customer
 *         example: 1
 *       created_at:
 *         type: string
 *         format: date-time
 *         description: customer creation datetime
 *       updated_at:
 *         type: string
 *         format: date-time
 *         description: customer update datetime
 *   Error:
 *     type: object
 *     properties:
 *        message:
 *           type: string
 *        error:
 *           type: boolean
 *           default: true
 */

router
  .route('/')

  /**
   * @swagger
   * /customers:
   *   post:
   *     tags:
   *       - customers
   *     summary: "Create a new customer"
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
   *           $ref: "#/definitions/Customer"
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: "#/definitions/Customer"
   *       403:
   *          description: customer not found
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
   *            type: object
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
   *           $ref: "#/definitions/customers"
   *       404:
   *          description: customer not found
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
   *           $ref: "#/definitions/Customer"
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: "#/definitions/Customer"
   *       400:
   *         description: Invalid customer
   */

  .put( validate(customerSchema.update), customerCtrl.update)

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
   *       400:
   *          description: "Invalid ID"
   */

  .delete( customerCtrl.destroy);

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

  .put( validate(customerSchema.updatePassword), customerCtrl.updatePassword);


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

  .post( validate(customerSchema.addBank), customerCtrl.addBank)

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

  .get( customerCtrl.findAllBankById);

export default router;
