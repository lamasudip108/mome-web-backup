import express from 'express';

import authRoutes from './auth.route';
import webRoutes from './web.route';
import userRoutes from './user.route';
import customerRoutes from './customer.route';
import transactionRoutes from './transaction.route';
import walletRoutes from './wallet.route';
import bankRoutes from './bank.route';

const router = express.Router();

// mount auth routes at /auth
router.use('/auths', authRoutes);

// mount web auth routes at /auth
router.use('/web/auths', webRoutes);

// mount user routes at /users
router.use('/users', userRoutes);

// mount customers routes at /customers
router.use('/customers', customerRoutes);

// mount transaction routes at /customers
router.use('/transactions', transactionRoutes);

// mount wallet routes at /customers
router.use('/wallets',walletRoutes);

// mount wallet routes at /customers
router.use('/banks',bankRoutes);

export default router;
