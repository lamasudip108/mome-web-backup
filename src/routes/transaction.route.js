import express from 'express';
import * as transactionCtrl from '../controllers/transaction.controller';

const router = express.Router();

router
  .route('/:id')

  /**
   * @swagger
   * /transactions/{id}:
   *   get:
   *     tags:
   *       - transactions
   *     summary: Find all transactions of customer by ID
   *     security:
   *        - Bearer: []
   *     operationId: finaAllByUserId
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: userid
   *         in: path
   *         description: userid of user that needs to be fetched
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: "#/definitions/Transaction"
   *       404:
   *          description: Transaction not found
   *          schema:
   *             $ref: '#/definitions/Error'
   */

  .get( transactionCtrl.findAllByCustomerId);


router
  .route('/')

  /**
   * @swagger
   * /transactions:
   *   get:
   *     tags:
   *       - transactions
   *     summary: Find all transactions
   *     security:
   *        - Bearer: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: "#/definitions/Transaction"
   *       404:
   *          description: Transaction not found
   *          schema:
   *             $ref: '#/definitions/Error'
   */

  .get( transactionCtrl.findAll);

export default router;
