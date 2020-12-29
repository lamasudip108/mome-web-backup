import express from 'express';
import * as transactionCtrl from '../controllers/transaction.controller';
import isAuthenticated from '../middlewares/authenticate';
import validate from '../config/joi.validate';
import userSchema from '../validators/user.validator';

const router = express.Router();

router
  .route('/:userid')

  /**
   * @swagger
   * /transactions/{userid}:
   *   get:
   *     tags:
   *       - transactions
   *     summary: Find all transactions of user by ID
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

  .get( transactionCtrl.finaAllByUserId);

export default router;
