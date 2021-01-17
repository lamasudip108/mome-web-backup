import express from 'express';

import * as webCtrl from '@controllers/web.controller';

const router = express.Router();

/**
 * @swagger
 * /web/auths/verification/{token}:
 *   get:
 *     tags:
 *       - webs
 *     summary: Verify new  customer account using jwt token from email link
 *     description:
 *     operationId: account verification
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: path
 *         description: jwt token from email notification
 *         required: true
 *         type: string
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
 *     summary: "Display reset password form from email notification"
 *     operationId: forgot-password
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: path
 *         description: jwt token from email notification
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Customer"
 *       400:
 *         description: Invalid token
 *         schema:
 *            $ref: '#/definitions/Error'
 *       404:
 *         description: Token not found
 *         schema:
 *            $ref: '#/definitions/Error'
 */
router.route('/forgot-password/:token')
  .get(webCtrl.forgotPasswordByToken);


/**
 * @swagger
 * /web/auths/reset-password:
 *   get:
 *     tags:
 *       - webs
 *     summary: "Reset password from email notification"
 *     operationId: reset-password
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Update customer password by new password
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Customer"
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Customer"
 *       400:
 *         description: Invalid token
 *         schema:
 *            $ref: '#/definitions/Error'
 *       404:
 *         description: Token not found
 *         schema:
 *            $ref: '#/definitions/Error'
 */
router.route('/reset-password')
  .post(webCtrl.resetPassword);

export default router;
