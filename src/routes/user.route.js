import express from 'express';

import * as userCtrl from '@controllers/user.controller';
import validate from '@config/joi.validate';
import userSchema from '@validators/user.validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: users
 *     description: User Operations
 */

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Unique identifier representing a specific user
 *         example: 1
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
 *       password:
 *         type: string
 *         description: password of the user
 *         required: true
 *         example: "123456"
 *       status:
 *         type: integer
 *         description: status of the user
 *         example: 1
 *       created_at:
 *         type: string
 *         format: date-time
 *         description: User creation datetime
 *       updated_at:
 *         type: string
 *         format: date-time
 *         description: User update datetime
 */

/**
 * @swagger
 * definitions:
 *   NewUserPayload:
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
 *       password:
 *         type: string
 *         description: password of the user
 *         required: true
 *         example: "123456"
 */

/**
 * @swagger
 * definitions:
 *   UpdateUserPayload:
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
   * /users:
   *   post:
   *     tags:
   *       - users
   *     summary: "Create a new user"
   *     security:
   *        - Bearer: []
   *     operationId: storeUser
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         description: Created user object
   *         required: true
   *         schema:
   *           $ref: "#/definitions/NewUserPayload"
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
   *       403:
   *          description: User not found
   *          schema:
   *             $ref: '#/definitions/Error'
   */
  .post(validate(userSchema.store), userCtrl.store)

  /**
   * @swagger
   * /users:
   *   get:
   *     tags:
   *       - users
   *     summary: "List all users"
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
   *                   $ref: '#/definitions/User'
   *       404:
   *          description: User not found
   *          schema:
   *             $ref: '#/definitions/Error'
   */
  .get(userCtrl.findAll);

router
  .route('/:id')

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     tags:
   *       - users
   *     summary: Find the user by ID
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
   *         description: id of user that needs to be fetched
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
   *                 $ref: "#/definitions/User"
   *       404:
   *          description: User not found
   *          schema:
   *             $ref: '#/definitions/Error'
   */
  .get(userCtrl.findById)

  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     tags:
   *       - users
   *     summary: "Update an existing user by ID"
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
   *         description: Updated user object
   *         required: true
   *         schema:
   *           $ref: "#/definitions/UpdateUserPayload"
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
   *          description: Invalid user
   *          schema:
   *             $ref: '#/definitions/Error'
   */
  .put(validate(userSchema.update), userCtrl.update)

  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     tags:
   *       - users
   *     summary: Delete the user by ID
   *     security:
   *       - Bearer: []
   *     operationId: destroy
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         description: id of user that needs to be deleted
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: OK
   *       400:
   *          description: Invalid ID
   *          schema:
   *             $ref: '#/definitions/Error'
   */
  .delete(userCtrl.destroy);

export default router;
