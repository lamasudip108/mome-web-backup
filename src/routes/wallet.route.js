import express from "express";
import * as walletCtrl from "../controllers/wallet.controller";
import isAuthenticated from "../middlewares/authenticate";

const router = express.Router();

router
  .route("/:userid")

  /**
   * @swagger
   * /wallets/{userid}:
   *   get:
   *     tags:
   *       - wallets
   *     summary: Find all wallets record of user by ID
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
   *           $ref: "#/definitions/Wallet"
   *       404:
   *          description: Wallet not found
   *          schema:
   *             $ref: '#/definitions/Error'
   */

  .get( walletCtrl.findAllByUserId);


router
  .route("/")

  /**
   * @swagger
   * /wallets:
   *   get:
   *     tags:
   *       - wallets
   *     summary: Find all wallets record
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
   *           $ref: "#/definitions/Wallet"
   *       404:
   *          description: Wallet not found
   *          schema:
   *             $ref: '#/definitions/Error'
   */

  .get( walletCtrl.findAll);

export default router;
