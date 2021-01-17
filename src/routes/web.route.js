import express from 'express';

import * as webCtrl from '@controllers/web.controller';

const router = express.Router();

/**
 * @swagger
 * /web/auths/confirmation/{token}:
 *   get:
 *     tags:
 *       - webs
 *     summary: Verify user account using jwt
 *     description:
 *     operationId: account verification
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: path
 *         description: token of customer that needs to be fetched
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *            $ref: '#/definitions/Token'
 *       400:
 *         description: Invalid token
 *         schema:
 *            $ref: '#/definitions/Error'
 *       404:
 *         description: Token not found
 *         schema:
 *            $ref: '#/definitions/Error'
 */
router.route('/verification/:token')
  .get(webCtrl.verifyAccountByToken);


/**
 * @swagger
 * /web/auths/forgot-password/{token}:
 *   get:
 *     tags:
 *       - webs
 *     summary: "Forgot password for customers"
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
router.route('/forgot-password/:token')
  .get(webCtrl.forgotPassword);


/**
 * @swagger
 * /web/auths/reset-password:
 *   get:
 *     tags:
 *       - webs
 *     summary: "Reset password for customers"
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
router.route('/reset-password')
  .post(webCtrl.resetPassword);

export default router;
