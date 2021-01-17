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
 *       - in: path
 *         name: token
 *         description: jwt token from email notification
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: OK
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
 *       - in: path
 *         name: token
 *         description: jwt token from email notification
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: OK
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
 *   post:
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
 *         properties:
 *           token:
 *             type: string
 *             example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE1MDk5ODg2NDZ9.1zTKAzXmuyQDHw4uJXa324fFS1yZwlriFSppvK6nOQY"
 *           password:
 *             type: string
 *             example: "123456"
 *           confirm_password:
 *             type: string
 *             example: "123456"
 *     responses:
 *       200:
 *         description: OK
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
