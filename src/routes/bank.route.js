import express from "express";
import * as transactionCtrl from "../controllers/bank.controller";
import isAuthenticated from "../middlewares/authenticate";

const router = express.Router();

router
  .route("/")

  /**
   * @swagger
   * /banks:
   *   get:
   *     tags:
   *       - banks
   *     summary: Find all banks
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
   *           $ref: "#/definitions/Banks"
   *       404:
   *          description: Bank not found
   *          schema:
   *             $ref: '#/definitions/Error'
   */

  .get( transactionCtrl.findAll);

export default router;
